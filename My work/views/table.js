function headingHTML(header)
{
    var temp = "<tr>";
    for(var headerName in header)
    {
        temp+= "<th>" +header[headerName]+ "</th>";
    }
    temp+="</tr>";
    return temp;
}
function bodyHTML(PersonDetail , header)
{

    var final = "";
    for(var i = 0; i < PersonDetail.length;i++)
    {
        var temp = "<tr>";
        for(var j = 0; j < header.length;j++)
        {
            temp+= "<td>"+PersonDetail[i][header[j]]+"</td>"
        }
        temp+=`<td> <input onclick="window.location.href='/update.html'" type="submit" value="Update" name="test" id="test"></td><td> <input type="submit" value="Delete " name="test" id="test"></td>`
        temp+= "</tr>"
        final+=temp;
        
    }
    return final;
}

        

