const rp = require('request-promise');
const cheerio = require('cheerio');
const db = require('./model/query')

var datos=new Array();
var meses= new Array();
var anios= new Array();

rp('https://www.loto.com.ni/resultados-anteriores/')
    .then(function (htmlString) {
        cheerio('[name=mes] option',htmlString).each(function(count,val)
        {
            meses[count]={
                'mes': cheerio(val).val()
            }
        });

        cheerio('[name=anio] option',htmlString).each(function(count,val)
        {
            anios[count]={
                'anio': cheerio(val).val()
            }
        });
       
        anios.forEach(function(anio){

            meses.forEach(function(mes){
               
                var options = {
                    uri: 'https://www.loto.com.ni/resultados-anteriores/?box=boxresultados1&mes='+mes.mes+'&anio='+anio.anio+'#resultados',
                    transform: function (body) {
                        return cheerio.load(body);
                    }
                };
                
                rp(options)
                    .then(function ($) {
                        $('.resultadosdiaria table tbody > tr').each(function(row, tr){
                            if (!isNaN(parseInt($(tr).find('td').eq(3).text()))){
                                datos[row]={
                                    'fecha': $(tr).find('td').eq(0).text(),
                                    'numero': parseInt( $(tr).find('td').eq(3).text()),
                                    'dia': $(tr).find('td').eq(0).text().match(/\d/g).join(''),
                                    'mes': mes.mes,
                                    'anio': anio.anio            
                                  } 
                            }          
                                
                        });


                      datos.forEach(function(val){
                          //console.log(val);
                          db.guardarDatos([val.numero,val.dia+'-'+val.mes+'-'+val.anio,'diaria',val.mes,val.anio]);
                      })      
                        
                    })
                    .catch(function (err) {
                        // Crawling failed or Cheerio choked...
                    });
            })
        })
       
    })
    .catch(function (err) {
    console.log(err);
});






