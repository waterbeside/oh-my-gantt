# OH-MY-GANTT

A simple javascript gantt

## Installation

NPM

```bash
npm install oh-my-gantt
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
<link rel="stylesheet"  href="https://unpkg.com/oh-my-gantt@1.1.0/dist/index.css" />
<script src="https://unpkg.com/oh-my-gantt@1.1.0/dist/index.umd.js"></script>
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
                to: '2021-12-05',
                desc: 'Task 1',
              },
            ]
          },
          {
            name: 'Task 2',
            timebar: [
              {
                from: '2021-12-02',
                to: '2021-12-03',
                desc: 'Task 2',
              },
            ]
          },
        ]
      
      const gantt = new OhMyGantt('#gantt-box', {
        from: '2021-12-01', // start time of time table
        to: '2021-12-31', // end time of time table
        columns: [
          {
            name: 'name',
            label: 'Name',
            width: 140,
          }
        ],
        data
      })
```
