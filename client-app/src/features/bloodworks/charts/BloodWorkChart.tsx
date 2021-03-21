import { format } from 'date-fns';
import { observer } from 'mobx-react-lite'
import React from 'react'
import { Button, Modal } from 'react-bootstrap';
import { Line } from 'react-chartjs-2';
import { useStore } from '../../../app/stores/store';

export default observer(function BloodWorkChart(){
    const {bloodWorkStore} = useStore();
    const {hideChartModal, isModalChartOpen, bloodWorkRegistry, chartType} = bloodWorkStore;

    let dataX: string[] = [];
    let dataY: number[] =[];

    bloodWorkRegistry.forEach(bloodWork => {
        dataX.unshift(format(bloodWork.examDate!, 'MMMM d, yyyy'));
        switch (chartType) { //rough and dirty because this is a last minute feature
            case "Hemoglobin": dataY.unshift(bloodWork.hemoglobin);
                break;
            case "Hematocrit": dataY.unshift(bloodWork.hematocrit);
                break;
            case "White blood cell count": dataY.unshift(bloodWork.whiteBloodCellCount);
                break;
            case "Red blood cell count": dataY.unshift(bloodWork.redBloodCellCount);
        }
    });

    const dataSet = [{
        label: chartType,
        fill: false,
        lineTension: 0.3,
        backgroundColor: 'rgba(238,52,52,1)',
        borderColor: 'rgba(0,0,0,1)',
        borderWidth: 2,
        data: dataY!
    }];

    const graph = {
        labels: dataX!,
        datasets: dataSet 
    }

    console.log(dataY);

    return (
        <>
            <Modal
                show={isModalChartOpen}
                onHide={hideChartModal}
            >
                <Line
                    data = {graph}
                    options={{
                        title:{
                            display: true,
                            text: chartType + " history",
                            fontSize:20
                        },
                        legend:{
                            display:true,
                            position:'right'
                        }
                    }}
                />
                <Button variant='success' onClick={hideChartModal}>Ok</Button>
            </Modal>
        </>
    )
})