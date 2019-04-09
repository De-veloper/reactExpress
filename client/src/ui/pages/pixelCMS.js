import React, { Component } from 'react';

import Header from '../Header';


class PixelCMS extends Component{
    state = {
        pixelObj:{},
        clientList:'',
        breadcrumb : [{
            static:'Pixel CMS',
            link:'<a href="/pixelcms/">Pixel CMS</a>'
        }]
    }
    getAllLiveClients (){
        fetch('/api/get_active_clients/')
        .then(results=>{
            return results.json();
        }).then(data=>{
            this.setState({
                clientList:data
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
                    pixelfile:data.replace(/ /g,'&nbsp;').replace(/\n/g,'<br>')
                });
                
            })
        }

    }
    createBreadCrumb(){
        /*let breadcrumb = [{
            static:'Pixel CMS',
            link:'<a href="/pixelcms/">Pixel CMS</a>'
        }];
        
        this.setState({
            breadcrumb:breadcrumb
        });*/
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
            '<div class="form-group row">'+
            '    <label for="'+id+'" class="col-sm-2 col-form-label">'+text+'</label>'+
            '    <div class="col-sm-10">'+
            '    <input type="text" readonly class="form-control-plaintext" id="'+id+'" value="'+value+'">'+
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
        //this.createBreadCrumb()
        
        console.log(this.state)
        if(this.props.match.params.clientID!=='' && this.props.match.params.file==='json') this.showPixelJson(this.props.match.params.clientID)
        if(this.props.match.params.clientID!=='') {
            if(this.props.match.params.file==='json') this.showPixelJson(this.props.match.params.clientID)
            if(this.props.match.params.file==='pixel') this.showPixelFile(this.props.match.params.clientID)
        }

    }


    //breadcrumb
    /*
                    {!/clientlist/i.test(this.props.match.url)?<span>Pixel CMS</span>:<span><a href="/pixelcms/">Pixel CMS</a> > <a href="/pixelcms/clientlist/">Client List</a> </span>}
                {(this.props.match.params.clientID?<span> > {this.props.match.params.clientID}</span>:'')}
                {(this.props.match.params.file?<span> > {this.props.match.params.file}</span>:'')}
                */
    render(){
        return (
            <div className="container">
                <Header titleTxt="Pixel CMS"/>
                Search Pixel: <input type="text" className="form-control" placeholder="pixel key work"/><button className="btn btn-primary">Search</button>
                
                <hr/>
                <div dangerouslySetInnerHTML={{ __html: this.state.breadcrumb[0].static}}/>
                

                {
                    ( this.props.match.params.clientID ?<div>
                    <h2>{this.props.match.params.clientID}</h2>
                    {( typeof this.props.match.params.file === 'undefined'?<div><a href={"/pixelcms/clientlist/"+this.props.match.params.clientID+"/pixel"} onClick={()=>{
                                        this.showPixelFile(this.props.match.params.clientID)}
                                    }>pixels.js</a> | <a href={"/pixelcms/clientlist/"+this.props.match.params.clientID+"/json"}>json</a></div>:'')}
                    </div>:'')
                }
                {( (this.props.match.params.clientID && this.props.match.params.file === 'json')?<div id="pixelForm"><div className="spinner-border" role="status"><span className="sr-only">Loading...</span></div></div>:'')}
                {( (this.props.match.params.clientID && this.props.match.params.file==='pixel')?(this.state.pixelfile?<div dangerouslySetInnerHTML={{ __html: this.state.pixelfile}}/>:<div className="spinner-border" role="status"><span className="sr-only">Loading...</span></div>):'')}


                { (/clientlist/i.test(this.props.match.url)?(this.props.match.params.clientID===undefined?<h1>Client List</h1>:''):<h1><a href="/pixelcms/clientlist">Client List</a></h1>)}
                {
                    ( (/clientlist/i.test(this.props.match.url) && this.props.match.params.clientID===undefined)?<div>
                        <h3>Total:{(this.state.clientList?this.state.clientList.length:'' )}</h3>
                        {
                            (this.state.clientList?this.state.clientList.map((e,i)=>
                            <div key={i}>
                                    <label><a href={"/pixelcms/clientlist/"+e}>{e}</a></label>  
                                </div>
                            ):<div className="spinner-border" role="status"><span className="sr-only">Loading...</span></div>)
                        }
                    </div>:''
                    )
                }

                
            </div>
            
        )
    }
}
export default PixelCMS;