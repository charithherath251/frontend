import IconButton from "../../components/IconButton";

function Policies() {
    return (
        <div className="main-container">
            <div className="container">
                <table className="table table-auto">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Department</th>
                            <th>Responsible Party</th>
                            <th>Purpose</th>
                            <th>Statement</th>
                            <th>Description</th>
                            <th>Associated</th>
                            <th>Date</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Policy 1</td>
                            <td>Department 1</td>
                            <td>Responsible Party 1</td>
                            <td>Purpose 1</td>
                            <td>Statement 1</td>
                            <td>Description 1</td>
                            <td>Associated 1</td>
                            <td>Date 1</td>
                            <td class="td-horizontal">
                                <IconButton iconb="list_alt" w="40" bg="blue" c="white"/>
                                <IconButton iconb="delete" w="40" bg="red" c="white"/>
                            </td>
                        </tr>

                        <tr>
                            <td>Policy 2</td>
                            <td>Department 2</td>
                            <td>Responsible Party 2</td>
                            <td>Purpose 2</td>
                            <td>Statement 2</td>
                            <td>Description 2</td>
                            <td>Associated 2</td>
                            <td>Date 2</td>
                            <td className="td-horizontal">
                                <IconButton iconb="list_alt" w="40" bg="blue" c="white"/>
                                <IconButton iconb="delete" w="40" bg="red" c="white"/>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Policies;