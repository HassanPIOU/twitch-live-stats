import React,{ useState,useEffect }  from "react"
import socket from "../_helpers/socketConnection";
import live from '../assets/images/live.gif'
import ChartView from "./ChartView";



 const HomeView =   () => {
     const [chess,setChess] = useState(0)
     const [heartstone,setHearthstone] = useState(0)
     const [rocket_league,setRocket_league] = useState(0)
     const [dota,setDota] = useState(0)

     useEffect(() => {
         //Emit request to start receiving from socket
         socket.emit("request");

         // Receive data from  Backend using socket
         socket.on("chess", data => {setChess(data)});
         socket.on("rocket_league", data => {setRocket_league(data)});
         socket.on("heartstone", data => {setHearthstone(data)});
         socket.on("dota", data => {setDota(data)});
     }, []);


     // Chart Data
     let chartData = {
          date : new Date(),
         'Hearthstone' : heartstone,
         "Rocket League" : rocket_league,
         "Dota 2" : dota
     }

        return(<div className="ui container">
                <h1 className="page-heading">Dashboard <img src={live} alt=""  className="liveIcon"  /></h1>

                <div className="ui equal width stackable grid">

                    <div className="row">
                        <div className="sixteen wide column">
                            <div className="forecasts ui basic segment">
                                <div className="ui grid">
                                    <div className="sixteen wide column">
                                        <h4>Game > Chess</h4>
                                        <div className="forecast">
                                            <h5>total viewers Live:</h5>
                                            <span className="stats">{chess}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                    <div className="row">
                        <div className="sixteen wide column">
                            <h2 className="subpage-heading no-border">Real Time</h2>
                            <div className="content">
                                <ChartView chartData={chartData} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>)



}

export { HomeView };