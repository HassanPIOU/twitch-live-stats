import React from "react"
class Header extends React.Component {

    render() {
        return (
            <>
                <div className="ui top attached menu" style={{background : "#ebebeb"}}>
                    <div className="ui icon item" style={{background : "#2abb9d", color : "#fff"}}>
                        <i className="file text icon" style={{fontSize : "2em"}}></i>
                    </div>
                    <div className="right menu">

                        <div className="item author" style={{padding : "10px 20px"}}>
                            <img className="ui avatar image" alt="" style={{marginRight : "15px"}}
                                 src="//semantic-ui.com/images/avatar/small/jenny.jpg" />piouhassan@gmail.com
                        </div>
                    </div>
                </div>
            </>
        );
    }
}
export default Header;