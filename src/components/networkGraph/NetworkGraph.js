import React from 'react'
import Graph from 'react-graph-vis'

export default function NetworkGraph({ height, nodes, edges }) {

    const graph = {
        nodes: nodes,
        edges: edges
    }

    var options = {
        // layout: {
        //     hierarchical: true
        //   },
        autoResize: true,
        physics: {
            enabled: true
        },
        interaction: {
            navigationButtons: true
        },
        nodes: {
            shape: "box",
            scaling: {
                min: 10,
                max: 30,
                label: {
                    min: 8,
                    max: 10,
                    drawThreshold: 12,
                    maxVisible: 20
                }
            },
            size: 12,
            font: {
                size: 8,
                face: "Poppins",
                color: '#000',
                width: '50%'
            }
        },
        // nodes: {
        //     borderWidth: 1,
        //     size: 50,
        //     highlight: {
        //         borderWidth: 1,
        //         background: '#D2E5FF'
        //     },
        //     hover: {
        //         border: '#2B7CE9',
        //         background: '#D2E5FF'
        //     },
        //     font: {
        //         color: "#fff",
        //         size: 16,
        //         padding: 20,
        //     }
        // },
        // edges: {
        //     arrows: {
        //         to: {
        //           enabled: true,
        //         },
        //       },
        //     color: '#4563E4',
        //     font: {
        //         color: "black",
        //         strokeWidth: 3, // px
        //         size: 16,
        //     },
        //     hoverWidth: 1.5,
        //     width: 2,
        // },
        edges: {
            width: 1,
            color: '#4563E4',
            smooth: {
                type: "continuous"
            },
            font: {
                size: 11,
                face: "Poppins"
            }
        },
        shadow: false,
        smooth: true,
        height: height
    }
    return (
        <Graph
            graph={graph}
            options={options}
        />
    )
}