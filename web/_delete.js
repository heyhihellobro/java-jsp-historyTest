#target photoshop

/*====================================================
 Author: Cataraga Liza
 ====================================================*/

var startRulerUnits = app.preferences.rulerUnits;
var startTypeUnits = app.preferences.typeUnits;
var startDisplayDialogs = app.displayDialogs;

app.preferences.rullerUnits = Units.PIXELS;
app.preferences.typeUnits = TypeUnits.PIXELS;
app.displayDialogs = DialogModes.NO;

while (app.documents.length) { app.activeDocument.close(); }

var calendarSettings = {

    window: {
        type: "dialog",
        title: "�������� ���� - ��������� ���������",
        propreties: undefined,
        resizeable: true,
        closeButton: true,
        maximizeButton: true,
        minimizeButton: false
    },

    calendar: {
        year: 2016,
        fontSize: 100,
        textColor: {
            red: 0,
            green: 0,
            blue: 0
        },
        title: "",
        language: "RUS"
    },

    document: {
        title: "Cataraga Liza - Calendar Script",
        waitForRedraw: 1,
        fontFamily: "Calibri",
        dimensions: {
            width: 2800,
            height: 1860,
            resolution: 72
        },
        foreground: {
            color: {
                red: 228,
                green: 89,
                blue: 89
            }
        }
    },

    month: {
        margin: {
            top: 10,
            left: 50
        },
        fontFamily: "Calibri",
        textColor: {
            red: 10,
            green: 130,
            blue: 120
        },
        fontSize: 48,
        monthNamesRus: [
            "������", "�������", "����", "������", "���", "����", "����", "������", "��������", "�������", "������", "�������"
        ],
        monthNamesEng: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    },

    day: {
        margin: {
            top: 5,
            left: 5
        },
        textContent: {
            margin: {
                left: 20,
                top: 50
            },
            titlesShortArrayRus: [
                "�", "�", "�", "�", "�", "�", "�"
            ],
            textColor: {
                red: 0,
                green: 0,
                blue: 0
            },
            fontSize: 48,
        },
        fontSize: 32,
        workday: {
            textColor: {
                red: 0,
                green: 0,
                blue: 0
            }
        },
        holiday: {
            textColor: {
                red: 255,
                green: 0,
                blue: 0
            }
        }
    }

};


/*====================================================
 ����������� ������������ ������� ����
 ====================================================*/
calendarSettings.calendar.language = "RUS";

var calendarTitleColor = prompt("�������� ���� �������� ���������", "0,0,0");
var calendarTitleColorArray = new Array();
calendarTitleColorArray = calendarTitleColor.split(",");

calendarSettings.calendar.textColor.red = parseInt(calendarTitleColorArray[0]);
calendarSettings.calendar.textColor.green = parseInt(calendarTitleColorArray[1]);
calendarSettings.calendar.textColor.blue = parseInt(calendarTitleColorArray[2]);


var calendarTitleSize = prompt("������ ������ ��������� ���������", "95");
calendarSettings.calendar.fontSize = parseInt(calendarTitleSize);

var monthTitleColor = prompt("�������� ���� ���������� �������", "10,130,120");
var monthTitleColorArray = new Array();
monthTitleColorArray = monthTitleColor.split(",");

calendarSettings.month.textColor.red = parseInt(monthTitleColorArray[0]);
calendarSettings.month.textColor.green = parseInt(monthTitleColorArray[1]);
calendarSettings.month.textColor.blue = parseInt(monthTitleColorArray[2]);


var weekTitleColor = prompt("������� ���� �������� ���� ������", "0,0,0");
var weekTitleColorArray = new Array();
weekTitleColorArray = weekTitleColor.split(",");

calendarSettings.day.textContent.textColor.red = parseInt(weekTitleColorArray[0]);
calendarSettings.day.textContent.textColor.green = parseInt(weekTitleColorArray[1]);
calendarSettings.day.textContent.textColor.blue = parseInt(weekTitleColorArray[2]);


var workdayTitleColor = prompt("������� ���� ������� ����", "0,0,0");
var workdayTitleColorArray = new Array();
workdayTitleColorArray = workdayTitleColor.split(",");

calendarSettings.day.workday.textColor.red = parseInt(workdayTitleColorArray[0]);
calendarSettings.day.workday.textColor.green = parseInt(workdayTitleColorArray[1]);
calendarSettings.day.workday.textColor.blue = parseInt(workdayTitleColorArray[2]);


var holidayTitleColor = prompt("������� ���� �������� ����", "255,0,0");
var holidayTitleColorArray = new Array();
holidayTitleColorArray = holidayTitleColor.split(",");

calendarSettings.day.holiday.textColor.red = parseInt(holidayTitleColorArray[0]);
calendarSettings.day.holiday.textColor.green = parseInt(holidayTitleColorArray[1]);
calendarSettings.day.holiday.textColor.blue = parseInt(holidayTitleColorArray[2]);


/*====================================================
 ������� ��������� ������ ������� ����������
 ====================================================*/
app.foregroundColor.rgb.red = 255;
app.foregroundColor.rgb.green = 0;
app.foregroundColor.rgb.blue = 0;

app.backgroundColor.rgb.red = calendarSettings.document.background.color.red;
app.backgroundColor.rgb.green = calendarSettings.document.background.color.green;
app.backgroundColor.rgb.blue = calendarSettings.document.background.color.blue;

calendarSettings.calendar.title = "=-= ��������� �� " + calendarSettings.calendar.year + " ��� =-=";

/*====================================================
 ������� ����� ��������. ��������� ��������� �������� �
 ���������� ���������� calendarSettings
 ====================================================*/
var docRef = null;

docRef = app.documents.add(
    calendarSettings.document.dimensions.width,
    calendarSettings.document.dimensions.height,
    calendarSettings.document.dimensions.resolution,
    calendarSettings.document.title,
    NewDocumentMode.RGB, DocumentFill.BACKGROUNDCOLOR, 1);

/*====================================================
 ������� ������� ���������
 ====================================================*/
DrawSimpleText(
    docRef,
    calendarSettings.calendar.title,
    calendarSettings.calendar.textColor,
    calendarSettings.calendar.fontSize,
    calendarSettings.document.fontFamily,
    (calendarSettings.document.dimensions.width) / 2 - (calendarSettings.calendar.title.length * calendarSettings.calendar.fontSize / 4) + 50,
    (calendarSettings.calendar.fontSize + 150)
);

if (calendarSettings.document.waitForRedraw == "1") {
    WaitForRedraw();
}

/*====================================================
 ������ �������� �������
 ====================================================*/
var monthsFolder = docRef.layerSets.add();
monthsFolder.name = "������";


for (var i = 0; i < 12; i++) {

    if (i < 6) {

        /*====================================================
         ������ ������ 6 �������
         ====================================================*/

        var monthPositionXY = {
            x: 175,
            y: (calendarSettings.calendar.fontSize + 450)
        };


        var monthFolder = monthsFolder.layerSets.add();
        monthFolder.name = calendarSettings.month.monthNamesRus[i];

        DrawSimpleText(
            monthFolder,
            calendarSettings.month.monthNamesRus[i],
            calendarSettings.month.textColor,
            calendarSettings.month.fontSize,
            calendarSettings.month.fontFamily,
            monthPositionXY.x + i*450,
            monthPositionXY.y
        );

        /*====================================================
         ������ �������� ���� ������
         ====================================================*/
        var  dayNamesFolder = monthFolder.layerSets.add();
        dayNamesFolder.name = "�������� ���� ������";

        for (var dn = 0; dn < 7; dn++) {
            DrawSimpleText(
                dayNamesFolder,
                calendarSettings.day.textContent.titlesShortArrayRus[dn],
                calendarSettings.day.textContent.textColor,
                calendarSettings.day.fontSize,
                calendarSettings.document.fontFamily,
                monthPositionXY.x - (monthPositionXY.x / 2 - 20) + (calendarSettings.day.textContent.margin.left + calendarSettings.day.textContent.fontSize / 2) * dn + i*450,
                monthPositionXY.y + calendarSettings.day.textContent.margin.top
            );
        }


        /*====================================================
         ������ �������� ���� (�����)
         ====================================================*/
        var date = new Date(calendarSettings.calendar.year, i);
        var firstDay = date.getDay();

        if (firstDay == 0) {
            firstDay = 6;
        } else {
            firstDay--;
        }


        /*====================================================
         ���������� ���������� ���� � ������
         ====================================================*/
        var monthSize = GetDaysInMonth(2016, i + 1);

        var daysFolder = monthFolder.layerSets.add();
        daysFolder.name = "���";

        var numberOfDate = 1;
        var e = firstDay;
        var offset = monthPositionXY.y + calendarSettings.day.fontSize + 20 + calendarSettings.day.margin.top / 2;

        while (numberOfDate <= monthSize) {
            offset += (calendarSettings.day.fontSize + calendarSettings.day.margin.top);
            for (; e < 7; numberOfDate++, e++) {
                if (numberOfDate > monthSize) {
                    continue;
                }

                if (e == 6 || e == 5) {
                    var dayColor = calendarSettings.day.holiday.textColor;
                } else {
                    var dayColor = calendarSettings.day.workday.textColor;
                }

                DrawSimpleText(
                    daysFolder,
                    numberOfDate,
                    dayColor,
                    calendarSettings.day.fontSize,
                    calendarSettings.document.fontFamily,
                    monthPositionXY.x - (monthPositionXY.x / 2 - 20) + (calendarSettings.day.textContent.margin.left + calendarSettings.day.textContent.fontSize / 2) * e + i*450,
                    offset
                );

            }
            e = 0;
            if (calendarSettings.document.waitForRedraw == "1") {
                WaitForRedraw();
            }
        }


    } else {

        var alignx = 6;
        /*====================================================
         ������ ������ 6 �������
         ====================================================*/

        var monthPositionXY = {
            x: 175,
            y: (calendarSettings.calendar.fontSize + 1050)
        };

        var monthFolder = monthsFolder.layerSets.add();
        monthFolder.name = calendarSettings.month.monthNamesRus[i];

        DrawSimpleText(
            monthFolder,
            calendarSettings.month.monthNamesRus[i],
            calendarSettings.month.textColor,
            calendarSettings.month.fontSize,
            calendarSettings.month.fontFamily,
            monthPositionXY.x + (i-alignx)*450,
            monthPositionXY.y
        );


        /*====================================================
         ������ �������� ���� ������
         ====================================================*/
        var  dayNamesFolder = monthFolder.layerSets.add();
        dayNamesFolder.name = "�������� ���� ������"

        for (var dn = 0; dn < 7; dn++) {
            DrawSimpleText(
                dayNamesFolder,
                calendarSettings.day.textContent.titlesShortArrayRus[dn],
                calendarSettings.day.textContent.textColor,
                calendarSettings.day.fontSize,
                calendarSettings.document.fontFamily,
                monthPositionXY.x - (monthPositionXY.x / 2 - 20) + (calendarSettings.day.textContent.margin.left + calendarSettings.day.textContent.fontSize / 2) * dn + (i-alignx)*450,
                monthPositionXY.y + calendarSettings.day.textContent.margin.top
            );
        }


        /*====================================================
         ������ �������� ���� (�����)
         ====================================================*/
        var date = new Date(calendarSettings.calendar.year, i);
        var firstDay = date.getDay();

        if (firstDay == 0) {
            firstDay = 6;
        } else {
            firstDay--;
        }


        /*====================================================
         ���������� ���������� ���� � ������
         ====================================================*/
        var monthSize = GetDaysInMonth(2016, i + 1);

        var daysFolder = monthFolder.layerSets.add();
        daysFolder.name = "���";

        var numberOfDate = 1;
        var e = firstDay;
        var offset = monthPositionXY.y + calendarSettings.day.fontSize + 20 + calendarSettings.day.margin.top / 2;

        while (numberOfDate <= monthSize) {
            offset += (calendarSettings.day.fontSize + calendarSettings.day.margin.top);
            for (; e < 7; numberOfDate++, e++) {
                if (numberOfDate > monthSize) {
                    continue;
                }

                if (e == 6 || e == 5) {
                    var dayColor = calendarSettings.day.holiday.textColor;
                } else {
                    var dayColor = calendarSettings.day.workday.textColor;
                }

                DrawSimpleText(
                    daysFolder,
                    numberOfDate,
                    dayColor,
                    calendarSettings.day.fontSize,
                    calendarSettings.document.fontFamily,
                    monthPositionXY.x - (monthPositionXY.x / 2 - 20) + (calendarSettings.day.textContent.margin.left + calendarSettings.day.textContent.fontSize / 2) * e + (i-alignx)*450,
                    offset
                );
            }
            e = 0;
            if (calendarSettings.document.waitForRedraw == "1") {
                WaitForRedraw();
            }
        }

        alignx++;
    }

}

/*====================================================
 �������, ������� ���������� ���������� ���� � ������ �
 ����.
 ====================================================*/
function GetDaysInMonth(year, month) {
    return new Date(year, month, 0).getDate();
}

/*====================================================
 �������, ������� ������� � ���������� ��������� ����
 ====================================================*/
function NewTextLayer(parent) {
    var textLayerRef = parent.artLayers.add();
    textLayerRef.kind = LayerKind.TEXT;

    return textLayerRef;
}

/*====================================================
 �������, ������� ��������� ���������� �����. ���������
 6 ����������:

 parent - ������������ ����
 content - ���������� ������
 colors - �������� ���� ������ �� 3 ������
 size - ������ ������
 fontName - �������� ������
 positionX - ������� �� X
 positionY - �������� �� Y
 ====================================================*/
function DrawSimpleText(parent, content, colors, size, fontName, positionX, positionY) {
    var textLayerRef = parent.artLayers.add();
    textLayerRef.kind = LayerKind.TEXT;

    /* ��������� ����� ������ */
    var textColor = new SolidColor();
    textColor.rgb.red = colors.red;
    textColor.rgb.green = colors.green;
    textColor.rgb.blue = colors.blue;

    var textRef = textLayerRef.textItem;
    textRef.contents = content;
    textRef.color = textColor;
    textRef.size = size;
    textRef.font = fontName;
    textRef.position = new Array(positionX, positionY);

}

/*====================================================
 �������, ������� ��������� ����������� ���� ����������
 ������� � ���������� ���������
 ====================================================*/
function WaitForRedraw() {
    var eventWait = charIDToTypeID("Wait")
    var enumRedrawComplete = charIDToTypeID("RdCm")
    var typeState = charIDToTypeID("Stte")
    var keyState = charIDToTypeID("Stte")
    var desc = new ActionDescriptor()
    desc.putEnumerated(keyState, typeState, enumRedrawComplete)
    executeAction(eventWait, desc, DialogModes.NO)
}

/*====================================================
 �������������� ������� �������� ���������
 ====================================================*/
app.preferences.rulerUnits = startRulerUnits
app.preferences.typeUnits = startTypeUnits
app.displayDialogs = startDisplayDialogs