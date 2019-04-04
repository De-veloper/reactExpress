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
        url:'/myraces',
        title:'My Races'
    },
    {
        url:'/clientlist',
        title:'Client List'
    },
    {
        url:'/pixelcms',
        title:'Pixel CMS'
    }
]
class Nav extends Component{
    render(){
        return (
            <nav className="navbar navbar-expand-sm bg-light">
                <ul className="navbar-nav">
                    {
                        navList.map((e,i)=>
                            <li className="nav-item" key={i}><Link className="nav-link" to={{ pathname: e.url }}>{e.title}</Link></li>
                        )
                    }
                </ul>
            </nav>
        )
    }
}
export default Nav;