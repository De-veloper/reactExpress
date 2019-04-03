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
    }
    //show each client pixels
    showPixelFile(clientID){
        fetch('/api/viewpixel/'+clientID)
        .then(results=>{
            return results.json();
        }).then(data=>{
            var splitByWords = function(text) {
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
              var wordsArray = splitByWords(data);
              var wordsMap = createWordMap(wordsArray);
              var finalWordsArray = sortByCount(wordsMap);
              //console.log(finalWordsArray)
            this.setState({
                pixelfile:data.replace(/ /g,'&nbsp;').replace(/\n/g,'<br>')
            });
            
        })
    }
    componentDidMount() {
        this.getAllLiveClients()
        //this.showPixelFile()
    }
    render(){
        
        return (
            <div>
                <Header titleTxt="Client List"/>
                <h2>Total:{(this.state.clientList?this.state.clientList.length:'' )}</h2>
                {
                    (this.state.clientList?this.state.clientList.map((e)=>
                       <div>
                            <h3 onClick={()=>this.showPixelFile(e)}>{e}</h3>
                        </div>
                    ):'')
                }
                <div dangerouslySetInnerHTML={{ __html: this.state.pixelfile}} style={{width:'100%',height:'650px',position:'fixed',top:'100px',right:'0px',left:'230px', overflow:'auto'}}/>
            </div>
            
        )
    }
}
export default ClientList;