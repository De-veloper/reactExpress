import React, { Component } from 'react';

import Header from '../Header';

class PixelCMS extends Component{
    state = {
        pixelObj:{},
        clientList:'',
        pixelSearch:'',
        pixelSearchBar:false,
        pixelSearchResult:[]
    }
    getAllLiveClients (){
        fetch('/api/get_active_clients/')
        .then(results=>{
            return results.json();
        }).then(data=>{
            let clientObj = data.map(function(e){
                return {
                    client:e,
                    pixelcount:0
                }
            })
           // console.log(clientObj)
            this.setState({
                clientList:clientObj
            });
            
        })
    }
    //Show pixel json
    showPixelJson(clientID){
        if(typeof clientID!=='undefined'){
            fetch('/api/viewpixeljson/'+clientID)
            .then(results=>{
                return results.json();
            }).then(data=>{
                this.setState({
                    pixelfileJson:data
                });
    
                this.buildPixelForm(data)
                
            })
        }
    }

    //show each client pixels
    showPixelFile(clientID){

        if(typeof clientID!='undefined'){
            fetch('/api/viewpixel/'+clientID)
            .then(results=>{
                return results.json();
            }).then(data=>{

                this.setState({
                    pixelfile:data
                });
                
            })
        }

    }
    searchInputUpdate(e){
        var newValue = e.target.value;
        this.setState({
            pixelSearch:newValue
        });
    }
    searchPixelByClient(pixel,clientID){
        if(typeof pixel!='undefined'){
            
            fetch('/api/searchpixel/'+pixel+'/'+clientID)
            .then(results=>{
                
                return results.json();
            }).then(data=>{
                this.setState({
                    test:data
                });
                console.log(this.state)
            })
        }
    }
    /*
    const request = async () => {
        const response = await fetch('https://api.com/values/1');
        const json = await response.json();
        console.log(json);
    }

    request();
    */
    searchPixelForAll(pixel,allclients){
        if(typeof pixel!=='undefined'){
            const request = async (path) => {
                const response = await fetch(path);
                const data = await response.json();
                
                if(data.folderData.code!==2){
                    this.setState({
                        pixelSearchResult:[...this.state.pixelSearchResult,data.folderData]
                    });
                }
            }

            for(var c = 0; c <80; c++){
                if(!/devsrc72|awstest|cicd72-amtx|cicd80-amtx|baylortest/i.test(allclients[c].client)){
                    console.log(allclients[c].client)
                    let path = '/api/searchpixel/'+pixel+'/'+allclients[c].client;
                    request(path);
                }

            }

            
            // for(var c = 0; c <80; c++){ //allclients.length
            //     fetch('/api/searchpixel/'+pixel+'/'+allclients[c].client)
            //     .then(results=>{
            //         return results.json();

            //     }).then(data=>{
                    
            //         if(data.folderData.code!==2){
            //             this.setState({
            //                 pixelSearchResult:[...this.state.pixelSearchResult,data.folderData]
            //             });
            //         }
            //         //console.log(this.state)
            //     })

            // }

        }
    }

    createBreadCrumb(){

        let breadcrumb = '';
        if(this.props.match.params.file){

            breadcrumb = <div>
                <a href="/pixelcms/">Pixel CMS</a> > 
                <a href="/pixelcms/clientlist/">Client List</a> > 
                <a href={"/pixelcms/clientlist/"+this.props.match.params.clientID}>{this.props.match.params.clientID}</a> > 
                <span>{this.props.match.params.file}</span>
            </div>

        } else if(this.props.match.params.clientID){

            breadcrumb = <div>
                <a href="/pixelcms/">Pixel CMS</a> > 
                <a href="/pixelcms/clientlist/">Client List</a> > 
                <span>{this.props.match.params.clientID}</span>
            </div>

        } else if (/clientlist/i.test(this.props.match.url)){

            breadcrumb = <div>
                <a href="/pixelcms/">Pixel CMS</a> > 
                <span href="/pixelcms/clientlist/">Client List</span> 
            </div>


        } else {


            breadcrumb = <div>
                <span href="/pixelcms/">Pixel CMS</span> 
            </div>

        }
        return breadcrumb
    }

    //https://okcciviccenter.evenue.net/www/ev_occ/ss/evenue/customize/ev_occ/pixel/json/client-pixel.json
    buildPixelForm (obj){
        let thisHTML = '';
        //Form group
        let createFormGroup = function(obj){
            let id = obj.id || ''
            let text = obj.text || ''
            let value = obj.value || ''
            let html = ''+
            '<div className="form-group row">'+
            '    <label for="'+id+'" class="col-sm-2 col-form-label">'+text+'</label>'+
            '    <div className="col-sm-10">'+
            '    <input type="text" readonly className="form-control-plaintext" id="'+id+'" value="'+value+'">'+
            '    </div>'+
            '</div>';
            
            return html

        }
        let listFilterObj = function(filterObj,pixel, i){
            let thisHTML = '';
            
            thisHTML += ((typeof filterObj.ev!='undefined' && filterObj.ev.length>0)?createFormGroup({id:'target_event_'+pixel+'_'+i, text:'EV', value:'['+filterObj.ev.join(',')+']'}):'')
            thisHTML += ((typeof filterObj.page!='undefined' && filterObj.page.length>0)?createFormGroup({id:'target_page_'+pixel+'_'+i, text:'PAGE', value:'['+filterObj.page.join(',')+']'}):'')
            thisHTML += ((typeof filterObj.group!='undefined' && filterObj.group.length>0)?createFormGroup({id:'target_group_'+pixel+'_'+i, text:'GROUP', value:'['+filterObj.group.join(',')+']'}):'')

            return thisHTML;

        }
        if(typeof obj['FB']!=='undefined') {
            thisHTML +='<h2>Face Book Pixel</h2>';
            for(var f=0; f<obj['FB'].length;f++){
                let theObj = obj['FB'][f];
                thisHTML += createFormGroup({id:'casenumber_fb_'+f, text:'case number', value:theObj.case});
                thisHTML += createFormGroup({id:'datetime_fb_'+f, text:'Date time', value:theObj.datetime});
                thisHTML += createFormGroup({id:'pixelid_fb_'+f, text:'ID', value:theObj.id});
                if (typeof theObj.filter!='undefined') thisHTML += listFilterObj(theObj.filter,'fb',f)
                thisHTML +='<hr/>';
            }
            
        }
        if(typeof obj['GA']!=='undefined') {
            thisHTML +='<h2>Google Adwords</h2>';
            for(var g=0; g<obj['GA'].length;g++){
                let theObj = obj['GA'][g];
                thisHTML += createFormGroup({id:'casenumber_ga_'+g, text:'case number', value:theObj.case});
                thisHTML += createFormGroup({id:'datetime_ga_'+g, text:'Date time', value:theObj.datetime});
                thisHTML += createFormGroup({id:'pixelid_ga_'+g, text:'ID', value:theObj.id});
                thisHTML += createFormGroup({id:'remar_label_ga_'+g, text:'Retarget Label', value:theObj.remar_label});
                thisHTML += createFormGroup({id:'conv_label_ga_'+g, text:'Conv Label', value:theObj.conv_label});
                thisHTML += createFormGroup({id:'currency_ga_'+g, text:'Currency', value:theObj.currency});
                if (typeof theObj.filter!='undefined') thisHTML += listFilterObj(theObj.filter,'ga',g)
                
                thisHTML +='<hr/>';
            }
        }
        if(typeof obj['DC']!=='undefined') {
            thisHTML +='<h2>Double Click</h2>';
            for(var d=0; d<obj['DC'].length;d++){
                let theObj = obj['DC'][d];
                thisHTML += createFormGroup({id:'casenumber_dc_'+g, text:'case number', value:theObj.case});
                thisHTML += createFormGroup({id:'datetime_dc_'+g, text:'Date time', value:theObj.datetime});
                thisHTML += createFormGroup({id:'pixelid_dc_'+g, text:'ID', value:theObj.id});
                thisHTML += createFormGroup({id:'confirm_typeid_dc_'+g, text:'Confirm Type ID', value:theObj.Confirm_typeId});
                thisHTML += createFormGroup({id:'typeid_dc_'+g, text:'Type ID', value:theObj.typeId});
                thisHTML += createFormGroup({id:'confirm_catid_dc_'+g, text:'Confirm Cat ID', value:theObj.Confirm_catId});
                thisHTML += createFormGroup({id:'catid_dc_'+g, text:'Cat ID', value:theObj.catId});
                if (typeof theObj.filter!='undefined') thisHTML += listFilterObj(theObj.filter,'dc',d)
                thisHTML +='<hr/>';
            }
        }

        if(typeof obj['Quantcast']!='undefined') {
            thisHTML +='<h2>Quantcast</h2>';
            for(var q=0; q<obj['Quantcast'].length;q++){
                let theObj = obj['Quantcast'][q];
                thisHTML += createFormGroup({id:'casenumber_qu_'+g, text:'case number', value:theObj.case});
                thisHTML += createFormGroup({id:'datetime_qu_'+g, text:'Date time', value:theObj.datetime});
                thisHTML += createFormGroup({id:'pixelid_qu_'+g, text:'ID', value:theObj.id});
                thisHTML +='<div>pixellabelsId: '+theObj.labels+'</div>';
                if (typeof theObj.filter!='undefined') thisHTML += listFilterObj(theObj.filter,'qu',q)
                thisHTML +='<hr/>';
            }
        }
        //TODO cant use  document.getElementById
        if(typeof obj.code!=='undefined' &&  obj.code===2){
            document.getElementById('pixelForm').innerHTML = 'No Results'
        } else {
            document.getElementById('pixelForm').innerHTML = thisHTML
        }
         
    }


    componentDidMount() {
        this.getAllLiveClients()
        if(this.props.match.params.clientID!=='' && this.props.match.params.file==='json') this.showPixelJson(this.props.match.params.clientID)
        if(this.props.match.params.clientID!=='') {
            if(this.props.match.params.file==='json') this.showPixelJson(this.props.match.params.clientID)
            if(this.props.match.params.file==='pixel') this.showPixelFile(this.props.match.params.clientID)
        }
        if(this.props.match.params.clientID && typeof this.props.match.params.file == 'undefined'){
            this.setState({
                pixelSearchBar:true
            });
        } else {
            this.setState({
                pixelSearchBar:false
            })
        }

    }

    render(){
        return (
            <div className="container">
                <Header titleTxt="Pixel CMS"/>

                {this.createBreadCrumb()}
                
                <div className="input-group mb-3">
                    <div className="input-group-prepend">
                        <span className="btn btn-primary">Search Pixel</span>
                    </div>
                    <input type="text" className="form-control" onChange={(e)=>this.searchInputUpdate(e)} placeholder="pixel key work" aria-label="pixel key work"/>
                    <div className="input-group-append">
                        <button className="btn btn-primary" type="button" onClick={()=>this.searchPixelForAll(this.state.pixelSearch,this.state.clientList)} >Search</button>
                    </div>
                </div>

                {(this.state.pixelSearchResult.length>0?this.state.pixelSearchResult.map((e,i)=> <div key={i}>{e.client}: {e.pcount}</div>):'')}
                
                
               
                {/*
                
                {this.state.pixelSearchResult?<div><h2>Search Keywork: {this.state.pixelSearch}</h2>{this.state.pixelSearchResult.map((e,i)=> { if(e.pcount!==0) return <div>{e.client}: {e.pcount}</div>})}</div>:<div className="spinner-border" role="status"><span className="sr-only">Loading...</span></div>}
                */}
                {
                    ( this.props.match.params.clientID ?<div>
                        <h1>{this.props.match.params.clientID}</h1>

                        {(this.state.pixelSearchBar?<div>
                            <div className="input-group mb-3">
                                <div className="input-group-prepend">
                                    <span className="btn btn-primary">Search Pixel</span>
                                </div>
                                <input type="text" className="form-control" onChange={(e)=>this.searchInputUpdate(e)} placeholder="pixel key work" aria-label="pixel key work"/>
                                <div className="input-group-append">
                                    <button className="btn btn-primary" type="button" onClick={()=>this.searchPixelByClient(this.state.pixelSearch,this.props.match.params.clientID)} >Search</button>
                                </div>
                            </div> 
                            
                            {(this.state.test?(typeof this.state.test.folderData.code!=='undefined' && this.state.test.folderData.code===2?<div>No results</div>:<div>Search Result: {this.state.test.folderData.pixel} - {this.state.test.folderData.pcount} time{(this.state.test.folderData.pcount===1?'':'s')} (source: /{this.state.test.folderData.folder}/pixels.js)</div>):'')}
                        </div>:'')}
                        
                

                        {( typeof this.props.match.params.file === 'undefined'?
                            <ul className="list-group">
                                <li className="list-group-item">
                                    <a href={"/pixelcms/clientlist/"+this.props.match.params.clientID+"/pixel"} onClick={()=>{
                                        this.showPixelFile(this.props.match.params.clientID)}
                                    }>pixels.js</a>
                                </li>
                                <li className="list-group-item">
                                    json (not available){/*<a href={"/pixelcms/clientlist/"+this.props.match.params.clientID+"/json"}>*/}
                                </li>
                            </ul>:'')}
                    </div>:'')
                }
                {( (this.props.match.params.clientID && this.props.match.params.file === 'json')?<div id="pixelForm"><div className="spinner-border" role="status"><span className="sr-only">Loading...</span></div></div>:'')}
                {( (this.props.match.params.clientID && this.props.match.params.file==='pixel')?(this.state.pixelfile?<div><span>source: /{this.state.pixelfile.folder}/pixel.js</span><br/><div dangerouslySetInnerHTML={{ __html: this.state.pixelfile.data.replace(/ /g,'&nbsp;').replace(/\n/g,'<br>')}}/></div>:<div className="spinner-border" role="status"><span className="sr-only">Loading...</span></div>):'')}


                { 
                    (/clientlist/i.test(this.props.match.url)?'':<ul className="list-group"><li className="list-group-item"><h3><a href="/pixelcms/clientlist">Client List</a> (Total:{(this.state.clientList?this.state.clientList.length:'' )})</h3></li></ul>)
                }
                
                {
                    ( (/clientlist/i.test(this.props.match.url) && this.props.match.params.clientID===undefined)?<div>
                        
                        <ul className="list-group">
                            <li className="list-group-item"><h4>Client List (Total:{(this.state.clientList?this.state.clientList.length:'' )})</h4></li>
                            {
                                (this.state.clientList?this.state.clientList.map((e,i)=>
                                    <li className="list-group-item" key={i}>
                                        <label><a href={"/pixelcms/clientlist/"+e.client}>{e.client}</a></label>  
                                    </li>
                                ):<div className="spinner-border" role="status"><span className="sr-only">Loading...</span></div>)
                            }
                        </ul>
                    </div>:''
                    )
                }

                
            </div>
            
        )
    }
}
export default PixelCMS;