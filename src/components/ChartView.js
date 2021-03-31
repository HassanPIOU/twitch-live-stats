import React  from "react"
import RTChart from 'react-rt-chart';

class ChartView extends React.Component{


    render() {
        return(
            <RTChart
        fields={['Hearthstone','Rocket League','Dota 2']}
        data={this.props.chartData} />
        )
    }
}

export default ChartView