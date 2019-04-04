import React, { Component } from 'react';

import Header from '../Header';

class PixelCMS extends Component{
    state = {
        pixelObj:{}
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



    //https://okcciviccenter.evenue.net/www/ev_occ/ss/evenue/customize/ev_occ/pixel/json/client-pixel.json
    buildPixelForm (obj){
        let thisHTML = '';
        let listFilterObj = function(filterObj){
            let thisHTML = '';
            
            thisHTML += ((typeof filterObj.ev!='undefined' && filterObj.ev.length>0)?'<div>EV: ['+filterObj.ev.join(',')+']</div>':'')
            thisHTML += ((typeof filterObj.page!='undefined' && filterObj.page.length>0)?'<div>PAGE: ['+filterObj.page+']</div>':'')
            thisHTML += ((typeof filterObj.group!='undefined' && filterObj.group.length>0)?'<div>GROUP: ['+filterObj.group+']</div>':'')

            return thisHTML;

        }
        if(typeof obj['FB']!=='undefined') {
            thisHTML +='<h2>Face Book</h2>';
            for(var f=0; f<obj['FB'].length;f++){
                let theObj = obj['FB'][f];
                thisHTML +='<div>case number: '+theObj.case+'</div>';
                thisHTML +='<div>date time: '+theObj.datetime+'</div>';
                thisHTML +='<div>id: '+theObj.id+'</div>';
                if (typeof theObj.filter!='undefined') thisHTML += listFilterObj(theObj.filter)
                thisHTML +='<hr/>';
            }
            
        }
        if(typeof obj['GA']!=='undefined') {
            thisHTML +='<h2>Google Adwords</h2>';
            for(var g=0; g<obj['GA'].length;g++){
                let theObj = obj['GA'][g];
                thisHTML +='<div>case number: '+theObj.case+'</div>';
                thisHTML +='<div>date time: '+theObj.datetime+'</div>';
                thisHTML +='<div>id: '+theObj.id+'</div>';
                thisHTML +='<div>remar_label: '+theObj.remar_label+'</div>';
                thisHTML +='<div>conv_label: '+theObj.conv_label+'</div>';
                thisHTML +='<div>currency: '+theObj.currency+'</div>';
                if (typeof theObj.filter!='undefined') thisHTML += listFilterObj(theObj.filter)
                
                thisHTML +='<hr/>';
            }
        }
        if(typeof obj['DC']!=='undefined') {
            thisHTML +='<h2>Double Click</h2>';
            for(var d=0; d<obj['DC'].length;d++){
                let theObj = obj['DC'][d];
                thisHTML +='<div>case number: '+theObj.case+'</div>';
                thisHTML +='<div>date time: '+theObj.datetime+'</div>';
                thisHTML +='<div>id: '+theObj.id+'</div>';
                thisHTML +='<div>pixelId: '+theObj.pixelId+'</div>';
                thisHTML +='<div>Confirm_typeId: '+theObj.Confirm_typeId+'</div>';
                thisHTML +='<div>typeId: '+theObj.typeId+'</div>';
                thisHTML +='<div>Confirm_catId: '+theObj.Confirm_catId+'</div>';
                thisHTML +='<div>catId: '+theObj.catId+'</div>';
                if (typeof theObj.filter!='undefined') thisHTML += listFilterObj(theObj.filter)
                thisHTML +='<hr/>';
            }
        }

        if(typeof obj['Quantcast']!='undefined') {
            thisHTML +='<h2>Quantcast</h2>';
            for(var q=0; q<obj['Quantcast'].length;q++){
                let theObj = obj['Quantcast'][q];
                thisHTML +='<div>case number: '+theObj.case+'</div>';
                thisHTML +='<div>date time: '+theObj.datetime+'</div>';
                thisHTML +='<div>id: '+theObj.id+'</div>';
                thisHTML +='<div>pixellabelsId: '+theObj.labels+'</div>';
                if (typeof theObj.filter!='undefined') thisHTML += listFilterObj(theObj.filter)
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
        //this.showPixelFile()
        if(this.props.match.params.clientID!=='') this.showPixelJson(this.props.match.params.clientID)
    }
    render(){
        return (
            <div className="container">
                <Header titleTxt="Pixel CMS"/>
                Search Pixel: <input type="text" className="form-control" placeholder="pixel key work"/><button className="btn btn-primary">Search</button>
                {(this.props.match.params.clientID?<div id="pixelForm"><div className="spinner-border" role="status"><span className="sr-only">Loading...</span></div></div>:'')}
            </div>
            
        )
    }
}
export default PixelCMS;