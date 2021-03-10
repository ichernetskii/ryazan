function getXmlHttp() {
    let xmlhttp;
    try {
        xmlhttp = new ActiveXObject("Msxml2.XMLHTTP"); // IE
    } catch (e) {
        try {
            xmlhttp = new ActiveXObject("Microsoft.XMLHTTP"); // IE
        } catch (E) {
            xmlhttp = false;
        }
    }
    if (!xmlhttp && typeof XMLHttpRequest != 'undefined') {
        xmlhttp = new XMLHttpRequest(); //
    }
    return xmlhttp;
}

export function jsonPOST(url, json, success, fail) {
    let xhr = getXmlHttp();
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-type", "application/json; charset=utf-8");
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            if (success) success(JSON.parse(xhr.responseText));
        } else {
            if (fail) fail();
        }
    };
    xhr.send(JSON.stringify(json));
}

export function filePOST(url, data, success, fail) {
    let xhr = getXmlHttp();
    xhr.open("POST", url, true);
    //xhr.setRequestHeader("Content-type", "application/json; charset=utf-8");
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            if (success) success(xhr.responseText);
        } else {
            if (fail) fail();
        }
    };
    xhr.send(data);
}
