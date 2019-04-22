import React, { Component } from 'react'

export class SideNavLinks extends Component {
    constructor(props) {
        super(props)
        this.state = {
            links: ['github', 'about'],
        }
    }

    displaySideNavLinks = () => {
        let { links } = this.state;
        let res = links.map((link, index) => {
            return (
                <div key={index}>
                    <a href="/" className={`${link}-tab`}>{link}</a>
                </div >
            )
        })
        return res;
    }

    render() {
        return (
            <div className="sidenav">
                {this.displaySideNavLinks()}
            </div>
        )
    }
}

export default SideNavLinks