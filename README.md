# OH-MY-GANTT

English | [简体中文](./README.zh-CN.md)

> Oh-my-gantt is a simple Gantt chart table tool that does not depend on third-party frameworks and can be integrated with major Javascript frameworks.

- [Installation](#installation)
- [Usage](#usage)
- [OhMyGantt Instance](#ohmygantt-instance)
  - [el](#el)
  - [Options](#options)
  - [Methods and Props](#methods-and-props)
- [Type and interface](#type-and-interface)
- [MarkLine instance](#markline-instance)
  - [MarkLine Options](#markline-options)
  - [The props of the MarkLine instance](#the-props-of-the-markline-instance)

## Installation

NPM

```bash
npm install oh-my-gantt -S
# or 
yarn add oh-my-gantt
```

```javascript
// import to your js or ts
import 'oh-my-gantt/dist/index.css'
import { OhMyGantt } from 'oh-my-gantt'
```

Direct \<script\> Include

```html
<link rel="stylesheet"  href="https://unpkg.com/oh-my-gantt@1.2.5/dist/index.css" />
<script src="https://unpkg.com/oh-my-gantt@1.2.5/dist/index.umd.js"></script>
<script>
  var OhMyGantt = OMG.OhMyGantt
<script>

```

## Usage

HTML

```html
<div id="gantt-box"></div>
```

JavaScript


```javascript

const data = [
  {
    name: 'Task 1',
    timebar: [
      {
        from: '2021-12-01',
        to: '2021-12-03',
        desc: 'Task 1',
      },
    ]
  },
  {
    name: 'Task 2',
    timebar: [
      {
        from: '2021-12-04',
        to: '2021-12-05',
        desc: 'Task 2',
        __config: { style: { backgroundColor: 'rgb(36, 112, 122)' } }
      },
    ]
  },
]

const gantt = new OhMyGantt('#gantt-box', {
  from: '2021-12-01',
  to: '2021-12-31',
  timeInterval: 'day',
  timeCellWidth: 120,
  columns: [
    {
      name: 'name',
      label: 'Task Name',
      width: 140,
    }
  ],
  data
})
```

<a id="OhMyGantt"></a>

## OhMyGantt Instance

The OhMyGantt constructor wraps two parameters: `element` and `Options`

```javascript
const myGanttInstacne = new OhMyGantt(element, {
  // ...Options
})
```

### element

Provide the OhMyGantt instance an existing DOM element to mount on. It can be a CSS selector string or an actual HTMLElement.

### Options

|  Option   | Descript  | Type | Default value / Params | Return |
|  ----   | ----      | ---- |------------- | ------ |
| from    | Set the start time of the Gantt chart table display | Date \| string | | |
| to      | Set the end time of the Gantt chart table display  | Date \| string | | |
| timeInterval  | Set the time interval of the time column  |  'day' \|'hour' \| 'week' \| 'month' \| 'year' \| number | 'day' | |
| dataGridWidth | The width setting of the data grid(the table on the left). | number | 240 | |
| timeCellWidth | The width of each column of the time grid | number | 120 | |
| timebarHeight | height of the timebar | number |  32 | |
| timebarDraggable | Whether the timebar allows dragging | boolean | false | |
| columns | Data grid field settings | [ColumnItem](#ColumnItem)[] | |
| data | Data content for display |  [MyGanttDataItem](#MyGanttDataItem) |  |
| timebarRenderer | A function for customizing the content rendered by the timebar |  | (TimebarData, OhMyGantt) | string or HTMLElement or null |
| timeGridCellRenderer |A function to customize the rendered content of `timetable` cells |  | | (data: [ColumnItem](#ColumnItem), columnIndex: number, ctx: OhMyGantt) | string or HTMLElement or null |
| timeLabelRenderer | The function used to customize the rendered content of the sub-content of the header cell of the `timetable` header | | (data: ColumnItem, columnIndex: number, ctx: OhMyGantt) | string or HTMLElement or null |
| onClickTimebar | Event fired when Timebar is clicked | |  ([TimebarData](#TimebarData), Event) |
| onMouseoverTimebar | Event fired when the mouse passes the Timebar |  | ([TimebarData](#TimebarData), Event) |
| onMouseleaveTimebar | Event fired when the mouse leaves the Timebar |  | ([TimebarData](#TimebarData), Event) |
| onDragTimebar | Event fired when timebar is dragged |  |  ([TimebarData](#TimebarData), Event) | |
| onDragstartTimebar | Event fired when the timebar starts to be dragged |  |  (TimebarData, Event) | |
| onDragendTimebar | Event fired when the timebar is finished dragging |  |  ([TimebarData](#TimebarData), Event) | |
| onClickCell | Event fired when cell is clicked |  | ( [CellData](#CellData), Event) |
| onDropCell | The event fired when the timebar is dragged and dropped to the cell  |  | ([CellData](#CellData), Event) |
| onDragoverCell | The event fired when the timebar is drag over the cell  |  | ([CellData](#CellData), Event) |
| onDragenterCell | The event triggered when the timebar is dragged enter the cell  |  | ([CellData](#CellData), Event) |
| onDragleaveCell | Event fired when timebar is dragged away from cell  |  | ([CellData](#CellData), Event) |
| onScroll | Event fired when table scrolls | | (GridScrollData, Event)  |
| onCreated | Event fired after the line executes `new OhMyGantt(Element, Options)` | | (OhMyGantt) |  |
| onRendered | Event fired after rendering the table | | (OhMyGantt) |  |

### Methods and Props

| Prop/Method | Descript | Type  | Return |
| ----- | ----- | ----- | -----| 
| element | The target Dom that was mounted when the instance was created | Element |
| data | The data set when the instance was created | [MyGanttDataItem](#MyGanttDataItem)[] |  |
| timeList | Time list of all time in the time grid | Date[] |
| from | Start time of the time grid | Date |
| to | End time of the time grid | Date |
| options | Setting items when creating an instance | [Options](#Options) |
| $elements | The object of the HTMLElement object that stores the data table and the time table after the instance is created | { <br>dataGrid: HTMLElement \| null, <br> timeGrid: HTMLElement \| null <br> } |
| renderDataGrid | Method: Render the left table (Data grid | ()=>[HTMLElement, number] |
 Returns the HTMLElement of the data grid and its width |
 | renderTimeGrid | Method: Render the right table (Time grid) | ()=>[HTMLElement, number] |
 Returns the HTMLElement of the time grid and its width |
| render | Method: Render the table (the renderDataGrid and renderTimeGrid methods will be executed) | ()=>void | |
| getScrollTop | Method: Get the scroll top of the table | () => number  | Return scroll top |
| getRowDataByIndex | Get the data of the row by the index value of the row |(index: number) => [MyGanttDataItem](#MyGanttDataItem) \| null | return the row of data |
| getRowDataById | Get the row data by row id |(index: number) => [MyGanttDataItem](#MyGanttDataItem) \| null | return the row of data |
| setMarkLine | Set a mark line | (markLine: MarkLine)=> void |  |
| removeMarkLine | remove a mark line | (markLine: MarkLine)=> void | |
| scrollToTime | The time grid scrolls horizontally to the specified time | (time: Date | string)=> void | |
| setScrollTop | Scroll the table to the specified height | (top: number)=> void | |
| scrollToRow | Scrolls the table to the specified row by row id or index value | ({index: number})=> void \|<br> ({id: string \| number })=> void | |

## Type and interface

### MyGanttDataItem

| Props | Descript | Type | Required |
| ----- | ----- | ----- | ----- |
| timebar | timebar设置 | [TimebarSetting](#TimebarSetting)[] |  |
| __config | The related settings for this row | { height?: number, [key: string]: any} |  |
|  [key: string] | 数据表格有其它任意数据 | any |  |

### TimebarSetting

| Props | Descript | Type | Required |
| ----- | ----- | ----- | ----- |
| from | Start time of timebar | Date \| string | Yes |
| to | End time of timebar | Date \| string | Yes |
| __config | The relevant settings of the timebar | { style?: number, [key: string]: any} |  |

### ColumnItem

| Props | Descript | Type | Required |
| ----- | ----- | ----- | ----- |
| name | column name | string | Yes |
| label | This column displays the content of the header | string | Yes |
| width | set column width | number |  |
| sourceData | Customized data content (if it is in the time table, it will be automatically generated, and its value is the timestamp of the time in this column) | any |  |

### CellData

| Props | Descript | Type |
| ----- | ----- | ----- |
| rowData | Data of the current row | any |
| $target | The HTMLElement for the current cell | HTMLElement |
| rowIndex | The index value of the current row | number |
| value | The value of the current cell | any |
| columnIndex | The index value of the current column | number |
| columnName | The name of the current column | any |

### TimebarData

| Props | Descript | Type |
| ----- | ----- | ----- |
| rowData | Data of the current row | any |
| $target | The HTMLElement for the current timebar | HTMLElement |
| rowIndex | The index value of the row where the current timebar is located | number |
| value | The value of the current timebar starting cell (usually the timestamp of the column time) | string |
| columnIndex | The index value of the current timebar starting cell | any |
| timeColumnsIndex | The index of the field occupied by the current timebar | any |
| timebarItemData | Current timebar related settings |  [TimebarSetting](#TimebarSetting) |

<a id="MarkLine"></a>

## MarkLine instance

```javascript
import { MarkLine } from 'oh-my-gantt'

const markLineInstance = new MarkLine({
  // ...MarkLine Options
})

// add a markLine
myGanttInstacne.setMarkLine(markLineInstance)

// remove markLine
myGanttInstacne.removeMarkLine(markLineInstance)

```

<a id="MarkLineOptions"></a>

### MarkLine Options

| Option | Descript | Type | Default |  Required |
| ----- | ----- | ----- | ---- | ----- |
| time | The time corresponding to the time grid | date \| string | | Yes |
| label | The text content displayed by the marker line label | string | | Yes |
| color | The color of the mark line | string | '#0086d4' | |
| lineStyle | Line style |  'solid' \| 'dashed' \| 'dotted' | 'solid' |
| lineWidth | Line width | number | 1 | |

### The props of the MarkLine instance

| Props | Descript | Type  |
| ----- | ----- | ----- |
| options | Setting items when creating MarkLine | [MarkLineOptions](#MarkLineOptions) |
| id | Unique ID generated when MarkLine is created | string |
| $element | HTMLElement generated when MarkLine is created | HTMLElement |
