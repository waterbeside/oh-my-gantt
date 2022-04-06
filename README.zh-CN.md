# OH-MY-GANTT

[English](./README.md) | 简体中文

> oh-my-gantt 是一个简易的甘特图表格工具，不依赖于第三方框架，可与主流的Javascript框架集成使用。

- [安装](#安装)
  - [使用NPM安装](#使用npm安装)
  - [直接使用 \<script\>](#直接使用-script)
- [使用](#使用)
- [创建OhMyGantt实例](#创建OhMyGantt实例)
  - [element](#element)
  - [设置项 Options](#设置项-options)
  - [属性和方法](#属性和方法)
- [类型接口](#类型接口)
- [创建一个MarkLine](#创建一个markline)
  - [MarkLine 设置项](#markline-设置项)
  - [MarkLine 对象属性](#markline-对象属性)

## 安装

### 使用NPM安装

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

### 直接使用 \<script\>

```html
<link rel="stylesheet"  href="https://unpkg.com/oh-my-gantt@1.2.7/dist/index.css" />
<script src="https://unpkg.com/oh-my-gantt@1.2.7/dist/index.umd.js"></script>
<script>
  var OhMyGantt = OMG.OhMyGantt
<script>

```

## 使用

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

## 创建OhMyGantt实例

OhMyGantt 构造函数包含两个参数：`element` 和 `Options`

```javascript
const myGanttInstacne = new OhMyGantt(element, {
  // ...Options
})
```

### element

提供一个在页面上已存在的 DOM 元素作为 OhMyGantt 实例的挂载目标。可以是 CSS 选择器，也可以是一个 HTMLElement 实例。

<a id="Options"></a>

### 设置项 Options

|  设置项名称   | 描述  | 类型 | 默认值 / 参数 | 返回 |
|  ----   | ----      | ---- |------------- | ------ |
| from    | 设置甘特图表显示的开始时间 | Date \| string | | |
| to      | 设置甘特图表显示的结束时间  | Date \| string | | |
| timeInterval  | 设置时间列的时间间隔  |  'day' \|'hour' \| 'week' \| 'month' \| 'year' \| number | 'day' | |
| dataGridWidth | 数据表格（左则表格）的宽度设置.  The width setting of the data table (the table on the left) | number | 240 | |
| timeCellWidth | 时间表格每栏宽度 | number | 120 | |
| timebarHeight | 时间条的高度 | number |  32 | |
| timebarDraggable | 时间条是否允许拖动 | boolean | false | |
| columns | 数据表格的字段设置 | [ColumnItem](#ColumnItem)[] | |
| data | 用于展示的数据内容 | [MyGanttDataItem](#MyGanttDataItem)[] |  |
| timebarRenderer | 用于自定义timebar所渲染内容的函数 |  | (TimebarData, OhMyGantt) | string or HTMLElement or null |
| timeGridCellRenderer | 用于自定义`时间表格`单元格所渲染内容的函数 |  | | (data: [ColumnItem](#ColumnItem), columnIndex: number, ctx: OhMyGantt) | string or HTMLElement or null |
| timeLabelRenderer | 用于自定义`时间表格`表头单元格子内容所渲染内容的函数 | | (data: ColumnItem, columnIndex: number, ctx: OhMyGantt) | string or HTMLElement or null |
| onClickTimebar | 点击Timebar时触发的事件 | |  ([TimebarData](#TimebarData), Event) |
| onMouseoverTimebar | 鼠标经过Timebar时触发的事件 |  | ([TimebarData](#TimebarData), Event) |
| onMouseleaveTimebar | 鼠标离开Timebar时触发的事件 |  | ([TimebarData](#TimebarData), Event) |
| onDragTimebar | 拖动timebar时触发的事件 |  |  ([TimebarData](#TimebarData), Event) | |
| onDragstartTimebar | 开始拖动timebar时触发的事件 |  |  (TimebarData, Event) | |
| onDragendTimebar | 结束拖动timebar时触发的事件 |  |  ([TimebarData](#TimebarData), Event) | |
| onClickCell | 点击单元格时触发的事件 |  | ( [CellData](#CellData), Event) |
| onDropCell | 把timebar拖放到单元格时触发的事件  |  | ([CellData](#CellData), Event) |
| onDragoverCell | 把timebar拖动经过单元格时触发的事件  |  | ([CellData](#CellData), Event) |
| onDragenterCell | 把timebar拖动进入单元格时触发的事件  |  | ([CellData](#CellData), Event) |
| onDragleaveCell | 把timebar拖离单元格时触发的事件  |  | ([CellData](#CellData), Event) |
| onScroll | 表格滚动时触发的事件 | | (GridScrollData, Event)  |
| onCreated | 即行执行 `new OhMyGantt(Element, Options)` 后触发的事件 | | (OhMyGantt) |  |
| onRendered | 执行渲染表格后所触发的事件 | | (OhMyGantt) |  |

### 属性和方法

| 属性/方法 | 描述 | Type  | Return |
| ----- | ----- | ----- | -----|
| element | 创建实例时挂载的目标Dom | Element |
| data | 创建实例时所设置的数据 | [MyGanttDataItem](#MyGanttDataItem)[] |  |
| timeList | 时间表格中所有时间的时间列表 | Date[] |
| from | 时间表格的时始时间 | Date |
| to | 时间表格的结束时间 | Date |
| options | 创建实例时的设置项 | [Options](#Options) |
| $elements | 创建实例后存放数据表格和时间格的HTMLElement对象的对象 | { <br>dataGrid: HTMLElement \| null, <br> timeGrid: HTMLElement \| null <br> } |
| renderDataGrid | 方法:渲染左则的数据表格（Data grid） | ()=>[HTMLElement, number] |
 返回数据表格的HTMLElement及其宽度 |
 | renderTimeGrid | 方法:渲染右则的时间表格 (Time grid) | ()=>[HTMLElement, number] |
 返回时间表格的HTMLElement及其宽度 |
| render | 方法:渲染表格 （会执行renderDataGrid和renderTimeGrid） | ()=>void | |
| getScrollTop | 方法:取得纵向滚动的上滚高度 | () => number  | 返回上滚高度 |
| getRowDataByIndex | 通过行的索引值取得该行数据 |(index: number) => [MyGanttDataItem](#MyGanttDataItem) \| null | 返回该行数据 |
| getRowDataById | 通过行的索引值取得该行数据 |(index: number) => [MyGanttDataItem](#MyGanttDataItem) \| null | 返回该行数据 |
| setMarkLine | 设置标记线（MarkLine） | (markLine: MarkLine)=> void |  |
| removeMarkLine | 移除标记线（MarkLine） | (markLine: MarkLine)=> void | |
| scrollToTime | 时间表格横向滚动到指定时间 | (time: Date | string)=> void | |
| setScrollTop | 使表格滚动到指定高度 | (top: number)=> void | |
| scrollToRow | 通过行的id或索引值使表格滚动到指定行 | ({index: number})=> void \|<br> ({id: string \| number })=> void | |

## 类型接口

### MyGanttDataItem

| 属性 | 描述 | 类型 | 是否必填 |
| ----- | ----- | ----- | ----- |
| timebar | timebar设置 | [TimebarSetting](#TimebarSetting)[] |  |
| __config | 该行的相关设置 | { height?: number, [key: string]: any} |  |
|  [key: string] | 数据表格有其它任意数据 | any |  |

### TimebarSetting

| 属性 | 描述 | 类型 | 是否必填 |
| ----- | ----- | ----- | ----- |
| from | timebar起始时间 | Date \| string | Yes |
| to | timebar结束时间 | Date \| string | Yes |
| __config | 该timebar的相关设置 | { style?: number, [key: string]: any} |  |

### ColumnItem

| 属性 | 描述 | 类型 | 是否必填 |
| ----- | ----- | ----- | ----- |
| name | 栏名称 | string | Yes |
| label | 该栏显示在表头的内容 | string | Yes |
| width | 设定列的宽度 | number |  |
| sourceData | 自定义的数据内容 （如果在时间表格，则自动生成，其值为该栏时间的时间戳） | any |  |

### CellData

| 属性 | 描述 | 类型 |
| ----- | ----- | ----- |
| rowData | 当前行的数据 | any |
| $target | 当前单元格的Dom对象 | HTMLElement |
| rowIndex | 当前行的索引值 | number |
| value | 当前单元格的值 | any |
| columnIndex | 当前栏的索引值 | number |
| columnName | 当前栏的名称 | any |

### TimebarData

| 属性 | 描述 | 类型 |
| ----- | ----- | ----- |
| rowData | 当前行的数据 | any |
| $target | 当前timebar起始单元格的Dom对象 | HTMLElement |
| rowIndex | 当前timebar所在行的索引值 | number |
| value | 当前timebar起始单元格的值（一般为该列时间的时间戳） | string |
| columnIndex | 当前timebar起始单元格的索引值 | any |
| timeColumnsIndex | 当前timebar占用栏位的索引 | number[] |
| timebarItemData | 当前timebar的相关设置 |  [TimebarSetting](#TimebarSetting) |

<a id="MarkLine"></a>

## 创建一个MarkLine

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

### MarkLine 设置项

| 设置项 | 描述 | 类型 | Default | 是否必填 |
| ----- | ----- | ----- | ---- | ----- |
| time | 时间表格所对应的时间 | date \| string | | Yes |
| label | 标记线label所显示的文字内容 | string | | Yes |
| color | 颜色 | string | '#0086d4' | |
| lineStyle | 线风格 |  'solid' \| 'dashed' \| 'dotted' | 'solid' |
| lineWidth | 线宽 | number | 1 | |

### MarkLine 对象属性

| 属性 | 描述 | 类型 |
| ----- | ----- | ----- |
| options | 创建MarkLine时的设置项 | [MarkLineOptions](#MarkLineOptions) |
| id | 创建MarkLine时生成的唯一ID | string |
| $element | 创建MarkLine时生成的HTMLElement | HTMLElement |
