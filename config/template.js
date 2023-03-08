export default 
`<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Chahal Japman Store</title>

    <style>
        * {
            margin: 0;
            padding: 0;
        }

        #header, #footer {
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
        }

        #header {
            margin: 40px;
        }

        #footer {
            align-items: flex-start;
            margin: 0 40px;
            margin-top: 20px;
        }

        .right-aligned {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: end;
        }

        #logo {
            width: 200px;
        }
        
        hr {
            margin: 0 40px;
        }

        #table{
            display: flex;
            margin: 80px 0;
        }

        table {
            margin: 0 40px;
            width: 100%;
        }

        thead {
            height: 40px;
        }

        th, td{
            text-align: center;
        }

        th:nth-child(1),
        td:nth-child(1){
            text-align: left;
        }

        th:last-child,
        td:last-child{
            text-align: right;
        }
    </style>
</head>
<body>
    <div id="header">
        <img id="logo" src="data:image/png;base64,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" alt="Chahal Japman Store Image" />
        <div class="right-aligned">
            <p><Strong>INVOICE</Strong></p>
            <p><Strong>Chahal Japman Store</Strong></p>
            <p>29, Refugee Market</p>
            <p>Sakchi, Jamshedpur, 831001</p>
            <p>Jharkhand, India</p>
        </div>
    </div>
    <hr />
    <div id="table">
        <table>
            <thead>
                <tr>
                    <th>Product</th>
                    <th>Quantity</th>
                    <th>Price</th>
                    <th>Discount</th>
                    <th>Total</th>
                </tr>
            </thead>
            <tbody>
                {{tableData}}
            </tbody>
        </table>
    </div>
    <hr />
    <div id="footer">
        <div id="customer">
            <strong>
                {{customerName}}
            </strong>
        </div>
        <div class="right-aligned">
            {{totals}}
        </div>
    </div>
</body>
</html>
`
