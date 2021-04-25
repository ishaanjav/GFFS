import "./Table.css";

function Table() {
    return (<>
        <link href="https://fonts.googleapis.com/css?family=Encode+Sans&amp;display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css?family=Montserrat&amp;display=swap" rel="stylesheet" />
        <link href="./css/main.css" rel="stylesheet" />
        <thead>
            <tr className="overflow-x-hidden">
                <th
                    className={
                        "whitespace-no-wrap px-6 align-middle border border-solid py-3 text-sm uppercase border-l-0 border-r-0 font-semibold text-left " +
                        (color === "light"
                            ? "bg-gray-100 text-gray-600 border-gray-200"
                            : "bg-blue-800 text-blue-300 border-blue-700")
                    }
                >
                    Time
                </th>
                <th
                    className={
                        "whitespace-no-wrap px-6 align-middle border border-solid py-3 text-sm uppercase border-l-0 border-r-0 font-semibold text-left " +
                        (color === "light"
                            ? "bg-gray-100 text-gray-600 border-gray-200"
                            : "bg-blue-800 text-blue-300 border-blue-700")
                    }
                >
                    Estimated Severity
                </th>
                <th
                    className={
                        "whitespace-no-wrap px-6 align-middle border border-solid py-3 text-sm uppercase border-l-0 border-r-0 font-semibold text-left " +
                        (color === "light"
                            ? "bg-gray-100 text-gray-600 border-gray-200"
                            : "bg-blue-800 text-blue-300 border-blue-700")
                    }
                >
                    Longitude/Latitude
                </th>
                <th
                    className={
                        "whitespace-no-wrap px-6 align-middle border border-solid py-3 text-sm uppercase border-l-0 border-r-0 font-semibold text-left " +
                        (color === "light"
                            ? "bg-gray-100 text-gray-600 border-gray-200"
                            : "bg-blue-800 text-blue-300 border-blue-700")
                    }
                >
                    Location
                </th>
                <th
                    className={
                        "px-6 align-middle border border-solid py-3 text-sm uppercase border-l-0 border-r-0 font-semibold text-left " +
                        (color === "light"
                            ? "bg-gray-100 text-gray-600 border-gray-200"
                            : "bg-blue-800 text-blue-300 border-blue-700")
                    }
                >
                    Estimated Date
                </th>
                <th
                    className={
                        "px-6 align-middle border border-solid py-3 text-sm uppercase border-l-0 border-r-0 font-semibold text-left " +
                        (color === "light"
                            ? "bg-gray-100 text-gray-600 border-gray-200"
                            : "bg-blue-800 text-blue-300 border-blue-700")
                    }></th>
            </tr>
        </thead>
        {<tbody className="pr-0">
            {/* loop through fetched flood data and add rows */}
            {Object.values(floodData).map((flood, index) => {
                return (<tr key={index}>
                    <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm p-4">
                        {flood.time}
                    </th>
                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm p-4">
                        {flood.severity}
                    </td>
                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm p-4">
                        {flood.latlon}
                    </td>
                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm p-4">
                        {flood.location}
                    </td>
                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm p-4">
                        {flood.estimated_date}
                    </td>
                </tr>)
            })}
        </tbody>}
        <div class="v11_325">
            <span class="text-2xl">Recent Warnings Nearby You</span>
        </div>
    </div>
    </>)
}

export default Table;
