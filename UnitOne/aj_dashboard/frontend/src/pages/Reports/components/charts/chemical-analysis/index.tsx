import Grid from "@mui/material/Grid";
import {Card, CardContent, CardHeader, IconButton} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { ResponsiveBar } from "@nivo/bar";
import React from "react";

const ChemicalAnalysis:React.FC<any> = ({ data, scale })=> {

    const getTspanGroups = (value: string, maxLineLength: number, maxLines: number = 2) => {
        const words = value.split(' ')
        
        type linesAcc = {
            lines: string[],
            currLine: string
        }

        //reduces the words into lines of maxLineLength
        const assembleLines: linesAcc = words.reduce( (acc: linesAcc, word: string) => {
            //if the current line isn't empty and the word + current line is larger than the allowed line size, create a new line and update current line
            if ( (word + acc.currLine).length > maxLineLength && acc.currLine !== '') {
                return {
                    lines: acc.lines.concat([acc.currLine]),
                    currLine: word
                }
            }
            //otherwise add the word to the current line
            return {
                ...acc,
                currLine: acc.currLine + ' ' + word 
            } 
            
        }, {lines: [], currLine: ''})

        //add the ending state of current line (the last line) to lines
        const allLines = assembleLines.lines.concat([assembleLines.currLine])

        //for now, only take first 2 lines due to tick spacing and possible overflow
        const lines = allLines.slice(0, maxLines)
        let children: JSX.Element[] = []
        let dy = 0

        lines.forEach( (lineText, i) => {
            children.push(
                <tspan x={0} dy={dy} key={i}>
                    {
                        // if on the second line, and that line's length is within 3 of the max length, add ellipsis
                        (1 === i && allLines.length > 2) ? lineText.slice(0, maxLineLength - 3) + '...' : lineText
                    }
                </tspan> 
            )
            //increment dy to render next line text below
            dy += 15
        });

        return children
    }

    return (      <Grid item xs={5}>
        <Card className='chart-card'>
            <CardHeader
                className='chart-card-header'
                action={
                    <IconButton aria-label="settings">
                        <MoreVertIcon/>
                    </IconButton>
                }
                title="Physical analysis"
            />

            <CardContent className='chart-card-content'>

            <ResponsiveBar
                data={data}
                keys={[
                    'Hardness',
                    'Fracturability',
                ]}
                indexBy="protocol"
                margin={{ top: 10, right: 60, bottom: 70, left: 60 }}
                padding={0.3}
                valueScale={{ type: 'linear' }}
                indexScale={{ type: 'band', round: true }}
                colors={({
                    id,
                    data
                  }: {id: any, data: any}) => String(data[`${id}Color`])}
                borderColor={{
                    from: 'color',
                    modifiers: [
                        [
                            'darker',
                            1.6
                        ]
                    ]
                }}
                axisTop={null}
                // axisBottom={{
                //     tickSize: 5,
                //     tickPadding: 5,
                //     tickRotation: 0,
                //     legend: 'Protocol',
                //     legendPosition: 'middle',
                //     legendOffset: 32
                // }}
                axisBottom={{
                    legend: 'Protocol',
                    legendPosition: 'middle',
                    legendOffset: 40,
                    renderTick: ({
                        opacity,
                        textAnchor,
                        textX,
                        textY,
                        value,
                        x,
                        y
                      }) => {
                        return (
                          <g
                            transform={`translate(${x},${y})`}
                            style={{ opacity }}
                          >
                            <text
                                style={{
                                    fontSize: 12,
                                    fill: '#999'
                                }}
                                textAnchor={textAnchor}
                                transform={`translate(${textX},${textY})`}
                            >
                              {getTspanGroups(value, 10, 2)}
                            </text>
                          </g>
                        )
                    }
                }}
                axisLeft={{
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                    legend: 'Hardness (g)',
                    legendPosition: 'middle',
                    legendOffset: -50
                }}
                axisRight={{
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                    legend: 'Fracturability (mm)',
                    legendPosition: 'middle',
                    legendOffset: 50,
                    renderTick: ({
                        value,
                        textX,
                        textY,
                        textAnchor,
                        x,
                        y,
                      }) => {
                        return (
                          <g
                            transform={`translate(${x},${y})`}
                          >
                            <text
                                style={{
                                    fontSize: 12,
                                    fill: '#999'
                                }}
                                textAnchor={textAnchor}
                                transform={`translate(${textX},${textY})`}
                            >
                              {Math.round((value / scale) * 100) / 100}
                            </text>
                          </g>
                        )
                    }
                }}
                enableLabel={false}
                labelSkipWidth={12}
                labelSkipHeight={12}
                labelTextColor={{
                    from: 'color',
                    modifiers: [
                        [
                            'darker',
                            1.6
                        ]
                    ]
                }}
                legends={[
                    {
                        dataFrom: 'keys',
                        anchor: 'bottom',
                        direction: 'row',
                        justify: false,
                        translateX: 0,
                        translateY: 70,
                        itemsSpacing: 2,
                        itemWidth: 100,
                        itemHeight: 20,
                        itemDirection: 'left-to-right',
                        itemOpacity: 0.85,
                        symbolSize: 10,
                        effects: [
                            {
                                on: 'hover',
                                style: {
                                    itemOpacity: 1
                                }
                            }
                        ]
                    }
                ]}
                // tooltip={(tooltip) => {
                //     console.log('TOOL', tooltip)
                //     return <div></div>
                // }}
                tooltip={({
                    id,
                    value,
                    color,
                    indexValue
                  }) => 
                    <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        padding: 8, 
                        background: 'white',
                        border: '0.5px solid grey',
                        borderRadius: 10}}>
                        <span style={{ fontSize: 12, padding: 0, margin: 0 }}>{indexValue}</span>
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',}}>
                            <span style={{ background: color, height: 12, width: 12, marginRight: 8}}></span>
                            <strong style={{ fontSize: 12, lineHeight: 1}}>
                                {id}: {id === 'Fracturability' ? value / scale : value}
                            </strong>
                        </div>
                        
                    </div>
                }
                role="application"
                ariaLabel="Nivo bar chart demo"
                groupMode="grouped"
            />

            </CardContent>
        </Card>
    </Grid>);
}

export default ChemicalAnalysis;

