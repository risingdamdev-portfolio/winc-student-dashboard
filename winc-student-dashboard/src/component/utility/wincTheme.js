const wincTheme = {
    area: {
        style: {
            data: {
                fill: '#212121'
            },
            labels: {
                fontFamily: 'Poppins, sans-serif',
                fontSize: 13,
                letterSpacing: 'normal',
                padding: 8,
                fill: '#666666',
                stroke: 'transparent',
                strokeWidth: 0
            }
        },
        width: 350,
        height: 350,
        padding: 50
    },
    axis: {
        style: {
            axis: {
                fill: 'transparent',
                stroke: '#ccc',
                strokeWidth: 1,
                strokeLinecap: 'round',
                strokeLinejoin: 'round'
            },
            axisLabel: {
                textAnchor: 'middle',
                fontFamily: 'Poppins, sans-serif',
                fontSize: 8,
                letterSpacing: 'normal',
                padding: 0,
                fill: '#ccc',
                stroke: 'transparent',
                strokeWidth: 0
            },
            grid: {
                fill: 'none',
                stroke: 'none'
            },
            ticks: {
                fill: 'transparent',
                size: 5,
                stroke: '#ccc',
                strokeWidth: 1,
                strokeLinecap: 'round',
                strokeLinejoin: 'round'
            },
            tickLabels: {
                fontFamily: 'Poppins, sans-serif',
                fontSize: 8,
                letterSpacing: 'normal',
                padding: 4,
                fill: '#666',
                stroke: 'transparent',
                strokeWidth: 0
            }
        },
        width: 350,
        height: 350,
        padding: 50
    },
    bar: {
        style: {
            data: {
                padding: 0,
                strokeWidth: 0
            },
            labels: {
                fontFamily: 'Poppins, sans-serif',
                fontSize: 9,
                letterSpacing: 'normal',
                padding: 4,
                fill: '#666666',
                stroke: 'transparent',
                strokeWidth: 0
            }
        },
        width: 350,
        height: 350,
        padding: 4
    },
    boxplot: {
        style: {
            max: {
                padding: 8,
                stroke: '#666666',
                strokeWidth: 1
            },
            maxLabels: {
                fontFamily: 'Poppins, sans-serif',
                fontSize: 13,
                letterSpacing: 'normal',
                padding: 8,
                fill: '#666666',
                stroke: 'transparent',
                strokeWidth: 0
            },
            median: {
                padding: 8,
                stroke: '#666666',
                strokeWidth: 1
            },
            medianLabels: {
                fontFamily: 'Poppins, sans-serif',
                fontSize: 13,
                letterSpacing: 'normal',
                padding: 8,
                fill: '#666666',
                stroke: 'transparent',
                strokeWidth: 0
            },
            min: {
                padding: 8,
                stroke: '#666666',
                strokeWidth: 1
            },
            minLabels: {
                fontFamily: 'Poppins, sans-serif',
                fontSize: 13,
                letterSpacing: 'normal',
                padding: 8,
                fill: '#666666',
                stroke: 'transparent',
                strokeWidth: 0
            },
            q1: {
                padding: 8,
                fill: '#666666'
            },
            q1Labels: {
                fontFamily: 'Poppins, sans-serif',
                fontSize: 13,
                letterSpacing: 'normal',
                padding: 8,
                fill: '#666666',
                stroke: 'transparent',
                strokeWidth: 0
            },
            q3: {
                padding: 8,
                fill: '#666666'
            },
            q3Labels: {
                fontFamily: 'Poppins, sans-serif',
                fontSize: 13,
                letterSpacing: 'normal',
                padding: 8,
                fill: '#666666',
                stroke: 'transparent',
                strokeWidth: 0
            }
        },
        boxWidth: 20,
        width: 350,
        height: 350,
        padding: 50
    },
    candlestick: {
        style: {
            data: {
                stroke: '#666666'
            },
            labels: {
                fontFamily: 'Poppins, sans-serif',
                fontSize: 13,
                letterSpacing: 'normal',
                padding: 8,
                fill: '#666666',
                stroke: 'transparent',
                strokeWidth: 0
            }
        },
        candleColors: {
            positive: '#ffffff',
            negative: '#666666'
        },
        width: 350,
        height: 350,
        padding: 50
    },
    chart: {
        width: 800,
        height: 300,
        padding: 50
    },
    errorbar: {
        borderWidth: 8,
        style: {
            data: {
                fill: 'transparent',
                opacity: 1,
                stroke: '#666666',
                strokeWidth: 2
            },
            labels: {
                fontFamily: 'Poppins, sans-serif',
                fontSize: 13,
                letterSpacing: 'normal',
                padding: 8,
                fill: '#666666',
                stroke: 'transparent',
                strokeWidth: 0
            }
        },
        width: 350,
        height: 350,
        padding: 50
    },
    group: {
        colorScale: [
            '#F4511E',
            '#FFF59D',
            '#DCE775',
            '#8BC34A',
            '#00796B',
            '#006064'
        ],
        width: 350,
        height: 350,
        padding: 50
    },
    legend: {
        colorScale: [
            '#F4511E',
            '#FFF59D',
            '#DCE775',
            '#8BC34A',
            '#00796B',
            '#006064'
        ],
        gutter: 10,
        orientation: 'vertical',
        titleOrientation: 'top',
        style: {
            data: {
                type: 'circle'
            },
            labels: {
                fontFamily: 'Poppins, sans-serif',
                fontSize: 13,
                letterSpacing: 'normal',
                padding: 8,
                fill: '#666666',
                stroke: 'transparent',
                strokeWidth: 0
            },
            title: {
                fontFamily: 'Poppins, sans-serif',
                fontSize: 13,
                letterSpacing: 'normal',
                padding: 5,
                fill: '#666666',
                stroke: 'transparent',
                strokeWidth: 0
            }
        }
    },
    line: {
        style: {
            data: {
                fill: 'transparent',
                opacity: 1,
                stroke: '#666666',
                strokeWidth: 3
            },
            labels: {
                fontFamily: 'Poppins, sans-serif',
                fontSize: 9,
                letterSpacing: 'normal',
                padding: 4,
                fill: '#666666',
                stroke: 'transparent',
                strokeWidth: 0
            }
        },
        width: 350,
        height: 350,
        padding: 50
    },
    pie: {
        colorScale: [
            '#F4511E',
            '#FFF59D',
            '#DCE775',
            '#8BC34A',
            '#00796B',
            '#006064'
        ],
        style: {
            data: {
                padding: 4,
                stroke: '#ECEFF1',
                strokeWidth: 1
            },
            labels: {
                fontFamily: 'Poppins, sans-serif',
                fontSize: 13,
                letterSpacing: 'normal',
                padding: 20,
                fill: '#666666',
                stroke: 'transparent',
                strokeWidth: 0
            }
        },
        width: 350,
        height: 350,
        padding: 50
    },
    scatter: {
        style: {
            data: {
                fill: '#666666',
                opacity: 1,
                stroke: 'transparent',
                strokeWidth: 0
            },
            labels: {
                fontFamily: 'Poppins, sans-serif',
                fontSize: 13,
                letterSpacing: 'normal',
                padding: 8,
                fill: '#666666',
                stroke: 'transparent',
                strokeWidth: 0
            }
        },
        width: 350,
        height: 350,
        padding: 50
    },
    stack: {
        colorScale: [
            '#F4511E',
            '#FFF59D',
            '#DCE775',
            '#8BC34A',
            '#00796B',
            '#006064'
        ],
        width: 350,
        height: 350,
        padding: 50
    },
    tooltip: {
        style: {
            fontFamily: 'Poppins, sans-serif',
            fontSize: 12,
            letterSpacing: 'normal',
            padding: 5,
            fill: '#666666',
            stroke: 'transparent',
            strokeWidth: 0,
            pointerEvents: 'none'
        },
        flyoutStyle: {
            stroke: '#212121',
            strokeWidth: 1,
            fill: '#f0f0f0',
            pointerEvents: 'none'
        },
        cornerRadius: 5,
        pointerLength: 10
    },
    voronoi: {
        style: {
            data: {
                fill: 'transparent',
                stroke: 'transparent',
                strokeWidth: 0
            },
            labels: {
                fontFamily: 'Poppins, sans-serif',
                fontSize: 13,
                letterSpacing: 'normal',
                padding: 5,
                fill: '#666666',
                stroke: 'transparent',
                strokeWidth: 0,
                pointerEvents: 'none'
            },
            flyout: {
                stroke: '#212121',
                strokeWidth: 1,
                fill: '#f0f0f0',
                pointerEvents: 'none'
            }
        },
        width: 350,
        height: 350,
        padding: 50
    }
}

export default wincTheme
