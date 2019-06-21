import React, { useEffect, useState } from 'react'

import LinearProgress from '@material-ui/core/LinearProgress'

import { makeStyles } from '@material-ui/core'

import { buildElementBuilder } from '../../utils/elementBuilder'

import { DAY, WEEK, MONTH } from '../../constants/partitions'

import { calculate, group } from '../../workers'

import { compose } from '../../utils'

import ControlPanel from './control'

import Group from './group'

const PARTITIONS_DICTIONARY = {
  [DAY]: 'День',
  [WEEK]: 'Неделя',
  [MONTH]: 'Месяц'
}

const useStyles = makeStyles({
  root: {
    marginTop: 20
  }
})

export default function Schedule ({ schedule }) {
  const { period, element } = schedule
  const [calculated, setCalculated] = useState(null)
  const [partition, setPartition] = useState(DAY)
  const [start, setStart] = useState(period.start)
  const [end, setEnd] = useState(period.end)
  const [groups, setGroups] = useState(null)
  const classes = useStyles()
  useEffect(() => {
    if (!calculated) {
      calculate(schedule)
        .then(setCalculated)
    } else if (!groups) {
      const events = calculated.filter(({ period }) => start <= period.start && period.end < end)
      group(partition, events)
        .then(setGroups)
    }
  })
  const builder = buildElementBuilder(element)
  const clearGroups = () => setGroups(null)
  const [ selectHandler, startHandler, endHandler ] = [setPartition, setStart, setEnd]
    .map(handler => compose(handler, clearGroups))
  return (
    <div className={classes.root}>
      <ControlPanel
        partition={partition}
        onSelectPartition={selectHandler}
        end={end}
        start={start}
        onStartChange={startHandler}
        onEndChange={endHandler}
        partitions={PARTITIONS_DICTIONARY}
      />
      {groups ? groups.map(({ start, items }) => (
        <Group
          key={start}
          start={start}
          builder={builder}
          partition={partition}
          items={items}
        />
      )) : <LinearProgress />}
    </div>
  )
}
