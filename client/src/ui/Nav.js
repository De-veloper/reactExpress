import React, { Component } from 'react';

import { Link } from 'react-router-dom'

const navList = [
    {
        url:'/',
        title:'Home'
    },
    {
        url:'/bikes',
        title:'Bikes'
    },
    //{url:'/origin',title:'Origin'},
    {
        url:'/refs',
        title:'Referrences'
    },
    {
        url:'/formtest',
        title:'Form Test'
    },
    {
        url:'/clientlist',
        title:'Client List'
    },
    {
        url:'/myraces',
        title:'My Races'
    }
]
class Nav extends Component{
    render(){
        return (
                <ul className="nav">
                    {
                        navList.map((e)=>
                            <li><Link to={{ pathname: e.url }}>{e.title}</Link></li>
                        )
                    }
                </ul>
            
        )
    }
}
export default Nav;