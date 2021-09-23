function headingHTML(headers)
{
    var temp = "<tr>";
    for(var headerName in headers)
    {
        temp+= "<th>" +headers[headerName]+ "</th>";
    }
    temp+="</tr>";
    return temp;
}
function bodyHTML(ProductList,headers)
{
    var final = "";
    for(var i = 0; i < ProductList.length;i++)
    {
        var temp = "<tr>";
        for(var j = 0; j < headers.length;j++)
        {
            temp+= "<td>"+ProductList[i][headers[j]]+"</td>"
        }
        temp+= "</tr>"
        final+=temp;
    }
    return final;
}
function listOfPerson(PersonDetail,header)
{
    return headingHTML(header) + bodyHTML(PersonDetail,header);
}