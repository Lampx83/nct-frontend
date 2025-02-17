import React, { useLayoutEffect, useRef } from "react";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import * as am4plugins_timeline from "@amcharts/amcharts4/plugins/timeline";
import * as am4plugins_bullets from "@amcharts/amcharts4/plugins/bullets";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

am4core.useTheme(am4themes_animated);

const Chart = () => {
  const chartContainer = useRef(null);

  useLayoutEffect(() => {
    let chart = am4core.create("chartdiv", am4plugins_timeline.SerpentineChart);

    // chart.curveContainer.padding(50, 20, 50, 20);
    // chart.levelCount = 4;
    // chart.yAxisRadius = am4core.percent(25);
    // chart.yAxisInnerRadius = am4core.percent(-25);
    // chart.maskBullets = false;

    // let colorSet = new am4core.ColorSet();
    // colorSet.saturation = 0.5;

    // chart.data = [
    //   {
    //     category: "Module #1",
    //     start: "2019-01-10",
    //     end: "2019-01-13",
    //     color: colorSet.getIndex(0),
    //     task: "Gathering requirements",
    //   },
    //   {
    //     category: "Module #1",
    //     start: "2019-02-05",
    //     end: "2019-04-18",
    //     color: colorSet.getIndex(0),
    //     task: "Development",
    //   },
    //   {
    //     category: "Module #2",
    //     start: "2019-01-08",
    //     end: "2019-01-10",
    //     color: colorSet.getIndex(5),
    //     task: "Gathering requirements",
    //   },
    //   {
    //     category: "Module #2",
    //     start: "2019-01-12",
    //     end: "2019-01-15",
    //     color: colorSet.getIndex(5),
    //     task: "Producing specifications",
    //   },
    //   {
    //     category: "Module #2",
    //     start: "2019-01-16",
    //     end: "2019-02-05",
    //     color: colorSet.getIndex(5),
    //     task: "Development",
    //   },
    //   {
    //     category: "Module #2",
    //     start: "2019-02-10",
    //     end: "2019-02-18",
    //     color: colorSet.getIndex(5),
    //     task: "Testing and QA",
    //   },
    //   {
    //     category: "",
    //   },
    //   {
    //     category: "Module #3",
    //     start: "2019-01-01",
    //     end: "2019-01-19",
    //     color: colorSet.getIndex(9),
    //     task: "Gathering requirements",
    //   },
    //   {
    //     category: "Module #3",
    //     start: "2019-02-01",
    //     end: "2019-02-10",
    //     color: colorSet.getIndex(9),
    //     task: "Producing specifications",
    //   },
    //   {
    //     category: "Module #3",
    //     start: "2019-03-10",
    //     end: "2019-04-15",
    //     color: colorSet.getIndex(9),
    //     task: "Development",
    //   },
    //   {
    //     category: "Module #3",
    //     start: "2019-04-20",
    //     end: "2019-04-30",
    //     color: colorSet.getIndex(9),
    //     task: "Testing and QA",
    //     disabled2: false,
    //     image2: "/wp-content/uploads/assets/timeline/rachel.jpg",
    //     location: 0,
    //   },
    //   {
    //     category: "Module #4",
    //     start: "2019-01-15",
    //     end: "2019-02-12",
    //     color: colorSet.getIndex(15),
    //     task: "Gathering requirements",
    //     disabled1: false,
    //     image1: "/wp-content/uploads/assets/timeline/monica.jpg",
    //   },
    //   {
    //     category: "Module #4",
    //     start: "2019-02-25",
    //     end: "2019-03-10",
    //     color: colorSet.getIndex(15),
    //     task: "Development",
    //   },
    //   {
    //     category: "Module #4",
    //     start: "2019-03-23",
    //     end: "2019-04-29",
    //     color: colorSet.getIndex(15),
    //     task: "Testing and QA",
    //   },
    // ];

    // chart.dateFormatter.dateFormat = "yyyy-MM-dd";
    // chart.dateFormatter.inputDateFormat = "yyyy-MM-dd";
    // chart.fontSize = 11;

    // let categoryAxis = chart.yAxes.push(new am4charts.CategoryAxis());
    // categoryAxis.dataFields.category = "category";
    // categoryAxis.renderer.grid.template.disabled = true;
    // categoryAxis.renderer.labels.template.paddingRight = 25;
    // categoryAxis.renderer.minGridDistance = 10;
    // categoryAxis.renderer.innerRadius = -60;
    // categoryAxis.renderer.radius = 60;

    // let dateAxis = chart.xAxes.push(new am4charts.DateAxis());
    // dateAxis.renderer.minGridDistance = 70;
    // dateAxis.baseInterval = { count: 1, timeUnit: "day" };
    // dateAxis.renderer.tooltipLocation = 0;
    // dateAxis.startLocation = -0.5;
    // dateAxis.renderer.line.strokeDasharray = "1,4";
    // dateAxis.renderer.line.strokeOpacity = 0.6;
    // dateAxis.tooltip.background.fillOpacity = 0.2;
    // dateAxis.tooltip.background.cornerRadius = 5;
    // dateAxis.tooltip.label.fill = new am4core.InterfaceColorSet().getFor(
    //   "alternativeBackground"
    // );
    // dateAxis.tooltip.label.paddingTop = 7;

    // let labelTemplate = dateAxis.renderer.labels.template;
    // labelTemplate.verticalCenter = "middle";
    // labelTemplate.fillOpacity = 0.7;
    // labelTemplate.background.fill = new am4core.InterfaceColorSet().getFor(
    //   "background"
    // );
    // labelTemplate.background.fillOpacity = 1;
    // labelTemplate.padding(7, 7, 7, 7);

    // let series = chart.series.push(new am4plugins_timeline.CurveColumnSeries());
    // series.columns.template.height = am4core.percent(20);
    // series.columns.template.tooltipText =
    //   "{task}: [bold]{openDateX}[/] - [bold]{dateX}[/]";

    // series.dataFields.openDateX = "start";
    // series.dataFields.dateX = "end";
    // series.dataFields.categoryY = "category";
    // series.columns.template.propertyFields.fill = "color"; // get color from data
    // series.columns.template.propertyFields.stroke = "color";
    // series.columns.template.strokeOpacity = 0;

    // let bullet = series.bullets.push(new am4charts.CircleBullet());
    // bullet.circle.radius = 3;
    // bullet.circle.strokeOpacity = 0;
    // bullet.propertyFields.fill = "color";
    // bullet.locationX = 0;

    // let bullet2 = series.bullets.push(new am4charts.CircleBullet());
    // bullet2.circle.radius = 3;
    // bullet2.circle.strokeOpacity = 0;
    // bullet2.propertyFields.fill = "color";
    // bullet2.locationX = 1;

    // let imageBullet1 = series.bullets.push(new am4plugins_bullets.PinBullet());
    // imageBullet1.disabled = true;
    // imageBullet1.propertyFields.disabled = "disabled1";
    // imageBullet1.locationX = 1;
    // imageBullet1.circle.radius = 20;
    // imageBullet1.propertyFields.stroke = "color";
    // imageBullet1.background.propertyFields.fill = "color";
    // imageBullet1.image = new am4core.Image();
    // imageBullet1.image.propertyFields.href = "image1";

    // let imageBullet2 = series.bullets.push(new am4plugins_bullets.PinBullet());
    // imageBullet2.disabled = true;
    // imageBullet2.propertyFields.disabled = "disabled2";
    // imageBullet2.locationX = 0;
    // imageBullet2.circle.radius = 20;
    // imageBullet2.propertyFields.stroke = "color";
    // imageBullet2.background.propertyFields.fill = "color";
    // imageBullet2.image = new am4core.Image();
    // imageBullet2.image.propertyFields.href = "image2";

    // let eventSeries = chart.series.push(
    //   new am4plugins_timeline.CurveLineSeries()
    // );
    // eventSeries.dataFields.dateX = "eventDate";
    // eventSeries.dataFields.categoryY = "category";
    // eventSeries.data = [
    //   {
    //     category: "",
    //     eventDate: "2019-01-15",
    //     letter: "A",
    //     description: "Something happened here",
    //   },
    //   {
    //     category: "",
    //     eventDate: "2019-01-23",
    //     letter: "B",
    //     description: "Something happened here",
    //   },
    //   {
    //     category: "",
    //     eventDate: "2019-02-10",
    //     letter: "C",
    //     description: "Something happened here",
    //   },
    //   {
    //     category: "",
    //     eventDate: "2019-02-29",
    //     letter: "D",
    //     description: "Something happened here",
    //   },
    //   {
    //     category: "",
    //     eventDate: "2019-03-06",
    //     letter: "E",
    //     description: "Something happened here",
    //   },
    //   {
    //     category: "",
    //     eventDate: "2019-03-12",
    //     letter: "F",
    //     description: "Something happened here",
    //   },
    //   {
    //     category: "",
    //     eventDate: "2019-03-22",
    //     letter: "G",
    //     description: "Something happened here",
    //   },
    // ];
    // eventSeries.strokeOpacity = 0;

    // let flagBullet = eventSeries.bullets.push(
    //   new am4plugins_bullets.FlagBullet()
    // );
    // flagBullet.label.propertyFields.text = "letter";
    // flagBullet.locationX = 0;
    // flagBullet.tooltipText = "{description}";

    // chart.scrollbarX = new am4core.Scrollbar();
    // chart.scrollbarX.align = "center";
    // chart.scrollbarX.width = am4core.percent(85);

    // let cursor = new am4plugins_timeline.CurveCursor();
    // chart.cursor = cursor;
    // cursor.xAxis = dateAxis;
    // cursor.yAxis = categoryAxis;
    // cursor.lineY.disabled = true;
    // cursor.lineX.strokeDasharray = "1,4";
    // cursor.lineX.strokeOpacity = 1;

    // dateAxis.renderer.tooltipLocation2 = 0;
    // categoryAxis.cursorTooltipEnabled = false;

    let map = [];

    map.push({
      text: "Lớp học",
      icon: "/images/class.svg",
      click: "cls",
    });
    map.push({
      text: "Thêm bài",
      icon: "/images/add.svg",
      lab: [
        {
          name: "room.labName",
          roomID: "room.roomID",
        },
      ],
    });

    chart.language.locale["_date_day"] = "dd/MM";
    chart.curveContainer.padding(100, 100, 0, 0);
    chart.levelCount = 3;
    chart.yAxisRadius = am4core.percent(20);
    chart.yAxisInnerRadius = am4core.percent(0);
    chart.maskBullets = false;
    chart.dateFormatter.inputDateFormat = "m s";
    chart.fontSize = 14;
    chart.tooltipContainer.fontSize = 10;

    chart.data = map;
    let colorSet = new am4core.ColorSet();
    for (let i = 0; i < chart.data.length; i++) {
      if (chart.data[i].category == null) chart.data[i].category = "   ";
      if (chart.data[i].start == null) chart.data[i].start = i + 1 + "";
    }
    for (let i = 0; i < chart.data.length; i++) {
      if (chart.data[i].end == null) {
        let found = false;
        let j;
        for (j = i + 1; j < chart.data.length; j++)
          if (chart.data[j].category === chart.data[i].category) {
            chart.data[i].end = chart.data[j].start;
            found = true;
            break;
          }
        if (j == chart.data.length) {
          chart.data[i].end = chart.data.length + "";
        }
      }
      if (chart.data[i].color == null) {
        chart.data[i].color = colorSet.getIndex(i);
        chart.data[i].color = colorSet.getIndex(
          29 - Math.round((i * 10) / chart.data.length)
        );
      }
      chart.data[i].textDisabled = false;
      if (i == chart.data.length - 1)
        chart.data[i].end = chart.data[i].start + " 1";
      if (chart.data[i].icon == null) {
        chart.data[i].icon = "/images/layer.svg";
      }
    }

    let categoryAxis = chart.yAxes.push(new am4charts.CategoryAxis());
    categoryAxis.dataFields.category = "category";
    categoryAxis.renderer.grid.template.disabled = true;
    categoryAxis.renderer.labels.template.paddingRight = 25;
    categoryAxis.renderer.minGridDistance = 10;

    let dateAxis = chart.xAxes.push(new am4charts.DateAxis());
    dateAxis.renderer.minGridDistance = 1;
    dateAxis.baseInterval = { count: 1, timeUnit: "minute" };
    dateAxis.dateFormats.setKey("minute", "mm");
    dateAxis.renderer.tooltipLocation = 0;
    dateAxis.renderer.line.strokeDasharray = "1,4";
    dateAxis.renderer.line.strokeOpacity = 0.4;
    dateAxis.tooltip.background.fillOpacity = 0.2;
    dateAxis.tooltip.background.cornerRadius = 5;
    dateAxis.tooltip.label.fill = new am4core.InterfaceColorSet().getFor(
      "alternativeBackground"
    );
    dateAxis.tooltip.label.paddingTop = 7;
    dateAxis.endLocation = 0;
    dateAxis.startLocation = 0;

    let labelTemplate = dateAxis.renderer.labels.template;
    labelTemplate.verticalCenter = "middle";
    labelTemplate.fillOpacity = 0.6;
    labelTemplate.background.fill = am4core.color("#eceff1");
    labelTemplate.background.fillOpacity = 1;
    labelTemplate.padding(0, 0, 0, 0);

    let series = chart.series.push(new am4plugins_timeline.CurveColumnSeries());
    series.columns.template.height = am4core.percent(12);
    series.dataFields.openDateX = "start";
    series.dataFields.dateX = "end";
    series.dataFields.categoryY = "category";
    series.baseAxis = categoryAxis;
    series.columns.template.propertyFields.fill = "color";
    series.columns.template.propertyFields.stroke = "color";
    series.columns.template.strokeOpacity = 0;
    series.columns.template.fillOpacity = 0.7;

    let label = chart.createChild(am4core.Label);
    label.text = "objClass.name";
    label.isMeasured = false;
    label.y = am4core.percent(30);
    label.x = am4core.percent(50);
    label.horizontalCenter = "middle";
    label.fontSize = 22;

    let imageBullet = series.bullets.push(new am4plugins_bullets.PinBullet());
    imageBullet.locationX = 1;
    imageBullet.propertyFields.stroke = "color";
    imageBullet.background.propertyFields.fill = "color";
    imageBullet.image = new am4core.Image();
    imageBullet.image.propertyFields.href = "icon";
    imageBullet.image.scale = 0.5;
    imageBullet.circle.radius = am4core.percent(100);
    imageBullet.dy = -5;
    // imageBullet.events.on("hit", myFunction, this);

    let textBullet = series.bullets.push(new am4charts.LabelBullet());
    textBullet.label.propertyFields.text = "text";

    textBullet.propertyFields.disabled = "textDisabled";
    textBullet.label.strokeOpacity = 0;
    textBullet.locationX = 1;
    textBullet.dy = -95;
    textBullet.label.textAlign = "middle";

    textBullet.label.wrap = true;
    textBullet.label.width = 200;
    // $(".rooms-spinner").addClass("d-none");

    chartContainer.current = chart;
  }, []);

  return <div id="chartdiv" className="container"></div>;
};

export default Chart;
