import React, { Component } from 'react';

import Header from '../Header';
//import myClientObj from './../../json/clients.json'
//import {HyperLink} from '../component/common/global';

class ClientList extends Component{
    state = {
        clientList:''
    };

    getAllLiveClients (){
        //http://localhost:3001/api/list/
        //if(this.state.clientList.length<1){
            fetch('/api/list/')
            .then(results=>{
                return results.json();
            }).then(data=>{
                //console.log(data)
                let oriArr = data.folderData
                let clientArr = []
                oriArr.map(function(e){
                    if(!/_|test/i.test(e)){
                        clientArr.push(e)
                    }
                });
                this.setState({
                    clientList:clientArr
                });
                
            })
        //}

    }
    //Show pixel json
    showPixelJson(clientID){
        fetch('/api/viewpixeljson/'+clientID)
        .then(results=>{
            return results.json();
        }).then(data=>{
            this.setState({
                pixelfileJson:data
            });
            
        })
    }
    //show each client pixels
    showPixelFile(clientID){

        if(typeof clientID!='undefined'){
            fetch('/api/viewpixel/'+clientID)
            .then(results=>{
                return results.json();
            }).then(data=>{
               /* var splitByWords = function(text) {
                    // split string by spaces (including spaces, tabs, and newlines)
                    var wordsArray = text.split(/\s+/);
                    return wordsArray;
                }
                  
                var createWordMap = function(wordsArray) {
                    var wordsMap = {};
                    wordsArray.forEach(function (key) {
                      if (wordsMap.hasOwnProperty(key)) {
                        wordsMap[key]++;
                      } else {
                        wordsMap[key] = 1;
                      }
                    });
                  
                    return wordsMap;
                  
                }
                  
                  
                var sortByCount = function(wordsMap) {
                  
                    // sort by count in descending order
                    var finalWordsArray = [];
                    finalWordsArray = Object.keys(wordsMap).map(function(key) {
                      return {
                        name: key,
                        total: wordsMap[key]
                      };
                    });
                  
                    finalWordsArray.sort(function(a, b) {
                      return b.total - a.total;
                    });
                  
                    return finalWordsArray;
                  
                }
                //var wordsArray = splitByWords(data);
                //var wordsMap = createWordMap(wordsArray);
                //var finalWordsArray = sortByCount(wordsMap);
                //console.log(finalWordsArray)*/
                
                this.setState({
                    pixelfile:data.replace(/ /g,'&nbsp;').replace(/\n/g,'<br>')
                });
                
            })
        }

    }
    componentDidMount() {
        this.getAllLiveClients()
        if(this.props.match.params.clientID!=='') this.showPixelFile(this.props.match.params.clientID)
        //this.showPixelFile()
    }
    render(){
        
        return (
            <div className="container">
                
                {(this.props.match.params.clientID?<Header titleTxt={this.props.match.params.clientID}/>:<Header titleTxt="Client List"/>)}
                {
                    (this.props.match.params.clientID?'':<div>
                        <h3>Total:{(this.state.clientList?this.state.clientList.length:'' )}</h3>
                        {
                            (this.state.clientList?this.state.clientList.map((e,i)=>
                            <div key={i}>
                                    <label>{e}</label> - (<a href={"/clientlist/"+e} onClick={()=>{
                                        this.showPixelFile(e)}
                                    }>pixels.js</a> | <a href={"/pixelcms/"+e}>json</a>)
                                </div>
                            ):<div className="spinner-border" role="status"><span className="sr-only">Loading...</span></div>)
                        }
                    </div>
                    )
                }

                <div style={{width:'100%',height:'650px',position:'fixed',top:'100px',right:'0px',left:'350px', overflow:'auto'}}>{this.state.pixelfileJson}</div>
                
                {(this.props.match.params.clientID?(this.state.pixelfile?<div dangerouslySetInnerHTML={{ __html: this.state.pixelfile}}/>:<div className="spinner-border" role="status"><span className="sr-only">Loading...</span></div>):'')}
            </div>
            
        )
    }
}
export default ClientList;