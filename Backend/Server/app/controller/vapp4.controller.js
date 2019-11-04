var dateFormat = require('dateFormat');

const https = require('https');
var http = require('http');
var fs = require('fs');
var FormData = require('form-data'); 
var faye = require('faye');

var odbc_url = process.env.ODBC_URL;
var odbc_port = process.env.ODBC_PORT;

var lxp_url = process.env.LXP_URL;
var lxp_port = process.env.LXP_PORT;

var alf_url = process.env.ALF_URL;
var alf_port = process.env.ALF_PORT;

var camera_ip_1 = process.env.CPS_CAMERA_IP1;
var camera_port_1 = process.env.CPS_CAMERA_PORT1;

var camera_ip_2 = process.env.CPS_CAMERA_IP2;
var camera_port_2 = process.env.CPS_CAMERA_PORT2;

var cylinder_ip_1 = process.env.CPS_CYLINDER_IP1;
var cylinder_port_1 = process.env.CPS_CYLINDER_PORT1;

var cylinder_ip_2 = process.env.CPS_CYLINDER_IP2;
var cylinder_port_2 = process.env.CPS_CYLINDER_PORT2;

var cps_url = process.env.CPS_URL;
var cps_port = process.env.CPS_PORT;

var CPScontrole;

exports.displayPage = function(req, res) {
  try{
  var page = req.params.page;
  console.log(page);
  res.writeHead(200, {"Content-Type": "text/html"});
  fs.readFile('./View/'+page, function(err, html){
    if(err){  
      throw err;
    }
    res.write(html);
    res.end();
  })
} catch(err){
  console.log(err)
  res.send(err)
}
}

exports.redirecting = function(req, res) {  
  res.redirect('/Vapp4/Accueil.html');
}

exports.displayLoginPage = function(req, res) {
  try{
    var page = req.params.page;
    res.writeHead(200, {"Content-Type": "text/html"});
    fs.readFile('./View/login.html', function(err, html){
      if(err){
        throw err;
      }
      res.write(html);
      res.end();
    })}
    catch(err){
      res.send(err);
    }
  }

  exports.favicon = function(req, res){
    try{
      res.writeHead(200, {"Content-Type": "image/png"});
      fs.readFile('./images/favicon.png', function(err, image){
        if(err){
          throw err;
        }
        res.write(image);
        res.end();
      })
    } catch(err) {
      res.send(err)
    }
  }

  exports.createUserPage = function(req, res) {
    try{
      var page = req.params.page;
      res.writeHead(200, {"Content-Type": "text/html"});
      fs.readFile('./View/CreateUser.html', function(err, html){
        if(err){
          throw err;
        }
        res.write(html);
        res.end();
      })
    } catch(err){
      res.send(err)
    }
  }

  exports.get3DScript = function(req, res) {
    try{
      var script = req.params.script;
      res.writeHead(200, {"Content-Type": "text/plain"});
      fs.readFile('./js/'+script, function(err, js){
        if(err){
          throw err;
        }
        res.write(js);
        res.end();
      })
    } catch(err){
      res.send(err)
    }
  }

  exports.getController = function(req, res) {
    try{
      var script = req.params.script;
      res.writeHead(200, {"Content-Type": "text/plain"});
      if (script == 'Project.js'){
        fs.readFile('./Server/app/'+script, function(err, js){
          if(err){
            throw err;
          }
          res.write(js);
          res.end();
        })
      }
      else {
        fs.readFile('./Server/app/controller/'+script, function(err, js){
          if(err){
            throw err;
          }
          res.write(js);
          res.end();
        })
      }
    } catch(err){
      res.send(err)
    }
  }

  exports.displayImages = function(req, res) {
    try{
      var image = req.params.image;
      res.writeHead(200, {"Content-Type": "image/jpg"});
      fs.readFile('./images/'+image, function(err, image){
        if(err){
          throw err;
        }
        res.write(image);
        res.end();
      })
    } catch(err){
      res.send(err)
    }
  } 

exports.getCssFiles = function(req, res){
    var file = req.params.file;
    res.writeHead(200, {"Content-Type": "text/css"});
    fs.readFile('./View/css/'+file, function(err, css){
      if(err){  
       throw err;
     }
     res.write(css);
     res.end();   
   })
  }

  exports.getUserCompany = function(req, res){
    try{
      var user = req.user.id;
      var query = "SELECT company from users U join customer C on U.customer=C.customer_id where user_id="+user;
      odbcConnector(query, function(result){
        console.log(result);
        res.send(result);
      });
    } catch(err){
      console.log(err);
    }
  }

  exports.getNewControlInformation = function(req, res){
    try{
      var query = 'Select cps_libele from cps';
      odbcConnector(query, function(result){
        res.send(result);
      });
    } catch(err){
      res.send(err)
    }
  }

  exports.setNewControlInformation = function(req, res){
    try{
      var body = req.body;
      var queryQuantity = "select O.qtepre, C.codcpt from ofsgen O join ofscde OC on OC.ideofs=O.ideofs join cdelig CL on OC.idelig=CL.idelig join cdeent C on C.idedoc=CL.idedoc where numofs='"+body.mo+"'";
      lxpConnector(queryQuantity, function(resultQuantity){
        var queryCps = 'select id from cps where cps_libele="'+body.cps+'"';
        odbcConnector(queryCps, function(resultCps){
          var query = "INSERT INTO control(cps, mo, ope, product, product_cost, ressource_cost,control_type, control_size, measure, max_tolerance, customer, quantity) VALUES ("+resultCps[0].id+",'"+body.mo+"','"+body.ope+"','"+body.product+"',"+body.product_cost+", "+body.ressource_cost+",'"+body.control_type+"', '"+body.control_size+"', '"+body.measure+"', "+body.max_tolerence+", '"+resultQuantity[0].codcpt+"', "+resultQuantity[0].qtepre+")";
          console.log(query)
          odbcConnector(query, function(result){
            res.send({message:'control added'});
          })
        })
      })
    } catch(err){
      res.send(err)
    }
  }

  exports.getAllControl = function(req, res){
    try{
      var query = 'select CO.id,mo,product,cps_libele, measure, max_tolerance from control CO join cps CP on CO.cps=CP.id'
      odbcConnector(query, function(result){
        res.send(result);
      })
    } catch(err){
      res.send(err)
    }
  //var result=[{id:1,mo_number:'9019054', product:'DT51387', CPS_id:1,measure: 'Appearence', tolerance:4},{id:2,mo_number:'9019027', product:'YG32784', CPS_id:2,measure: 'Appearence', tolerance:3}]
  //res.send(result)
}

exports.getGlobalControlInformation = function(req, res){
  try{
    var mo = req.params.mo;
    var query = "SELECT * from control where mo='"+mo+"'";
    odbcConnector(query, function(result){
        res.send(result);
    })
  //var result={cps_id:id,mo:9019054,operation:'Appearence',product_ref:'DT51387', customer:'ALSTOM', quantity:100, control:'Sample'/*,defect_rate:33*/, ressource_cost:67, /*production_rate:3,*/ product_cost:84, /*total_nc_cost:2772,*//* total_shutdown_cost:600,*/ /*impact:'Minor'*/}
  } catch(err){
    res.send(err)
  }
}

exports.startCPSControl = function(req, res){
  // pub/sub
  var control = req.params.control;
  try{
    CPSControleFunction(control)
    res.send({message:'control begin'})
  } catch(err){
    console.log(err)
  }
}

exports.stopCPSControl = function(req, res){
  try{
    clearInterval(CPScontrole);
    res.send({message:'control stopped'});
  } catch(err){
    console.log(err)
    res.send(err);
  }
}

function CPSControleFunction(control){
  try{
      var controlSize = 0;
      var action;
      var queryControl = 'select mo, product, cps, measure, max_tolerance from control where id='+control
      odbcConnector(queryControl, function(resultControl){
        var querySize = 'select control_size from control where id='+control
        odbcConnector(querySize, function(resultSize){
          controlSize = resultSize[0].control_size;
          console.log('size total: '+controlSize)
          // beginning of the control
          CPScontrole = setInterval(function(){
            // get the current number of piece
            var queryCurSize = 'select count(id) as size from product_control where control = '+control
            odbcConnector(queryCurSize, function(resultCurSize){
              console.log(resultCurSize[0].size)
              // if the number of control is equal of the control size we stop the control
              if(Number(resultCurSize[0].size)>=controlSize){
                clearInterval(CPScontrole);
              } else {
                var nbBlob = Math.floor(Math.random() * Math.floor(8));
                var query = 'INSERT INTO product_control(nb_blob, control) VALUES ('+nbBlob+','+control+');';
                console.log(query);
                odbcConnector(query, function(result){
                  action = '';
                  if(nbBlob>resultControl[0].max_tolerance){
                    var ok = 'NOK'
                    action = 'Major'
                  } else {
                    var ok = 'OK'
                    if(nbBlob>=Math.trunc(resultControl[0].max_tolerance*0.9)){
                      action='Minor'
                    }
                  }
                  bayeux.getClient().publish('/control', {mo:resultControl[0].mo, product:resultControl[0].product, cps:resultControl[0].cps, measure:resultControl[0].measure, tolerence:resultControl[0].max_tolerance, blob:nbBlob, ok:ok, action:action});
                  console.log(nbBlob);
                })
              }
            })
          }, 4000);
        })
      })
  } catch(err){
    console.log(err)
  }
}

  exports.configureCamera = function(req, res){
    try{
      var body = req.body;
    //{"ip":"192.168.0.100","port":"5002"}/{"ip":"192.168.0.101","port":"5003"}
    var camera1 = {ip:body.ip1, port:body.port1};
    var camera2 = {ip:body.ip2, port:body.port2};
      /*const id = {
        host : cps_url,
        path: '/configureCamera/'+camera1+'/'+camera2,
        port: cps_port,
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      };  

      const idCallback = function(response) {
        let str = '';
        response.on('data', function(chunk) {
          str += chunk;
        });

        response.on('end', function(){
          console.log(str);
          var result = JSON.parse(str);
          callback(result.request);
        })
      }

      const idReq = http.request(id, idCallback);
      idReq.end();*/
      console.log(cps_url+':'+cps_port+'/configureCamera/'+camera1+'/'+camera2);
      res.send({message:'camera configured'})
    } catch(err){
      res.send(err)
    }
  }

  exports.configureCylindre = function(req, res){
    try{
      var body = req.body;
      //{"ip":"192.168.0.102","port":"5003","time":"200"}/{"ip":"192.168.0.103","port":"5002","time":"200"}
      var verrin1 = {ip:body.ip1, port:body.port1, time:body.time1};
      var verrin2 = {ip:body.ip2, port:body.port2, time:body.time2};

      /*const id = {
        host : cps_url,
        path: '/configureActuator/'+verrin1+'/'+verrin2,
        port: cps_port,
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      };  

      const idCallback = function(response) {
        let str = '';
        response.on('data', function(chunk) {
          str += chunk;
        });

        response.on('end', function(){
          console.log(str);
          var result = JSON.parse(str);
          callback(result.request);
        })
      }

      const idReq = http.request(id, idCallback);
      idReq.end();*/
      console.log(cps_url+':'+cps_port+'/configureActuator/'+verrin1+'/'+verrin2);
      res.send({message:'cylindre configured'})
    } catch(err){
      res.send(err);
    }
  }

  exports.getListOfMO = function(req, res){
    try{
      var query = 'select numofs, O.datcre, qtepre, libar1, codcpt from ofsgen O join ofscde OC on O.ideofs=OC.ideofs join cdelig CL on OC.idelig=CL.idelig join cdeent CE on CL.idedoc=CE.idedoc';
      lxpConnector(query, function(result){
        res.send(result);
      });
    } catch(err){
      res.send(err)
    }
  }

  exports.getListOperation = function(req, res){
    try{
      var mo = req.params.mo;
      var query = "select libope from ofsope P join ofsgen O on P.ideofs=O.ideofs where O.numofs='"+mo+"'";
      lxpConnector(query, function(result){
        console.log(result)
        res.send(result);
      })
    } catch(err){
      res.send(err)
    }
  }

  exports.getFile = function(req, res){
  try{
    var document_name = req.params.document_name;
    var doc;
    switch(document_name){
      case 'minor':
        doc = 'Minor_Action.pdf';
        break;
      case 'major':
        doc = 'Major_Action.pdf';
        break;
      default:
        doc = '';
        break;
    }
    var query = 'select id_dcme from documents where document_name ="' +doc+'"'
    odbcConnector(query, function(result){
      getTicket(function(ticket){
          getDocument(result[0].id_dcme, ticket, function(file){
            res.writeHead(200, {"Content-Type": "application/pdf"});
            res.write(file);
            res.end();
          })
      })
    })
  } catch (err){
    res.send(err)
  }
}

function getTicket (callback){
  const initLogin = {
    host : alf_url,
    path: '/dcme/v1/alfresco/s/api/login',
    port: alf_port,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    }
  };

  const bodyLogin = '{"username":"admin", "password":"ADMIN"}'

  const loginCallback = function(response) {
    let str = '';
    var tamp;
    response.on('data', function(chunk) {
      str += chunk;
    });

    response.on('end', function(){
      tamp = JSON.parse(str);
      ticket = tamp.data.ticket;
      callback(ticket);
    });

    
  }
  const logReq = https.request(initLogin, loginCallback);
  logReq.write(bodyLogin);
  logReq.end();
}

function getDocument (adress, ticket, callback){
  const initLogin = {
    host : alf_url,
    path: '/dcme/v1/alfresco/s/api/node/workspace/SpacesStore/'+adress+'/content?a=false&alf_ticket='+ticket,
    port: alf_port,
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  };

  const loginCallback = function(response) {
    let str = '';
    var tamp;
    response.on('data', function(chunk) {
      str += chunk;
    });

    response.on('end', function(){
      //tamp = JSON.parse(str);
      console.log(str)
      //doc = tamp.data.file;
      callback(str);
    });

    
  }
  const logReq = https.request(initLogin, loginCallback);
  logReq.end();
}

  function odbcConnector(request, callback){
    try{
      const id = {
        host : odbc_url,
        path: '/odbcvApp4/v1/api/odbcModels/requestdb?request='+escape(request),
        port: odbc_port,
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'rejectUnauthorized':false
        }
      };  

      const idCallback = function(response) {
        let str = '';
        response.on('data', function(chunk) {
          str += chunk;
        });

        response.on('end', function(){
          console.log(str);
          var result = JSON.parse(str);

          callback(result.request);
        })
      }

      const idReq = https.request(id, idCallback);
      idReq.end();
    } catch(err){
      res.send(err)
    }
  }

  function lxpConnector(request, callback){
    try{
      const id = {
        host : lxp_url,
        path: '/lxpConnector/v1/api/lxpModels/getData?query='+escape(request),
        port: lxp_port,
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      };  

      const idCallback = function(response) {
        let str = '';
        response.on('data', function(chunk) {
          str += chunk;
        });

        response.on('end', function(){
          var result = JSON.parse(str);
          console.log('result');
          console.log(result);
          callback(result.data);
        })
      }
      const idReq = https.request(id, idCallback);
      idReq.end();
    } catch(err){
      console.log(err)
    }
  }