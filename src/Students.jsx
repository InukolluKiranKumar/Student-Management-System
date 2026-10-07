import React, {useState, useEffect} from 'react'
import Dashboard from './Dashboard.jsx'
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.min.css'


function Students(){

    const [rollno, setRollno] = useState("");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [address, setAddress] = useState("");

    const [search, setSearch] = useState("");

    const [sortField, setSortField] = useState("");
    const [sortOrder, setSortOrder] = useState("asc");

    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 3;
    
    const [student, setStudent] = useState([]);
    const [id, setId] = useState(null);
    const api_url ="http://localhost:3000/students";



    const filteredStudents = student.filter((s) => {

        const text = search.toLowerCase();

        return(
            String(s.rollno).toLowerCase().includes(text) ||
            String(s.name).toLowerCase().includes(text) ||
            String(s.email).toLowerCase().includes(text) ||
            String(s.address).toLowerCase().includes(text)
        );
    });

    const sortedStudents = [...filteredStudents].sort((a, b) => String(a[sortField]).localeCompare(String(b[sortField])));

    if(sortOrder === "desc"){
        sortedStudents.reverse();
    }

    const handleSort = (field) => {
        if(sortField === field && sortOrder === "asc"){
            setSortOrder("desc");
        }
        else{
            setSortOrder("asc");
        }
        setSortField(field);
        setCurrentPage(1);
    };

    const totalPages = Math.ceil(sortedStudents.length / pageSize);
    
    const startIndex = (currentPage - 1) * pageSize;
    const paginatedStudents = sortedStudents.slice(startIndex, startIndex+pageSize);


    const getStudents = async() => {

        try{
            const response = await axios.get(api_url);
            setStudent(response.data);
        }
        catch(e){
            console.log(e);
        }
        
    }
    useEffect(() => {
        getStudents();
    }, [])

    const handleSubmit = async(e) => {
        e.preventDefault();
        if (!rollno.trim() || !name.trim() || !email.trim() || !address.trim()) {
    alert("Please fill all the fields");
    return;
}
        const student={
            rollno : rollno,
            name : name,
            email : email,
            address : address
        }
        try{
            if(id==null){
                await axios.post(api_url, student);
                alert("Student added");
                setId(null);
                //getStudents();
            }
            else{
                await axios.put(`${api_url}/${id}`, student);
                alert("student updated");
                setId(null);
               // getStudents();
            }
            getStudents();
            setRollno("");
            setName("");
            setEmail("");
            setAddress("");
            setId(null);
        }
        catch(e){
            console.log(e)
        }
    }
    const deleteStudent = async(id) => {
        try{
            await axios.delete(`${api_url}/${id}`, student);
            alert("student Deleted");
            getStudents();
            setId(null);  
        }
        catch(e){
            console.log(e);
        }
    }

    const editStudent = (student) => {
        setRollno(student.rollno);
        setName(student.name);
        setEmail(student.email);
        setAddress(student.address)
        setId(student.id);
    }

    return(
        
        <div className="container mt-4">
            <h1 className="h1 mb-4">Student Management System</h1>
            
            <Dashboard students={student} />

            <input className="form-control mb-5"
            placeholder="Search for a student"
                    value={search} onChange = {(e) => {setSearch(e.target.value); setCurrentPage(1);}}
                    />
            
            <form onSubmit={handleSubmit} classname="mb-4">
                <input className="form-control mb-1"
                placeholder="Enter your Roll No" onChange={(e)=>setRollno(e.target.value)} value={rollno}/>
                <br />
                <input className="form-control mb-1"
                placeholder="Enter your Name" onChange={(e)=>setName(e.target.value)} value={name}/>
                <br />
                <input className="form-control mb-1"
                placeholder="Enter your Email" onChange={(e)=>setEmail(e.target.value)} value={email}/>
                <br />
                <input className="form-control mb-1"
                placeholder="Enter your Address" onChange={(e)=>setAddress(e.target.value)} value={address}/>
                <br />
                <button className="btn btn-primary form-control mb-2"
                type="submit">SUBMIT</button>
                
                <br />
                <br />
            </form>
            <p className="text-muted"
            >**Click column headings of each section for SORTING</p>
            <table className="table table-bordered table-hover"
            >
                <thead className="table-dark">
                    <tr>
                        <th onClick={() => handleSort("rollno")}>Roll No</th>
                        <th onClick={() => handleSort("name")}>Name</th>
                        <th onClick={() => handleSort("email")}>Email</th>
                        <th onClick={() => handleSort("address")}>Address</th>
                        <th onClick={() => handleSort("rollno")}>Alteration</th>
                    </tr>
                </thead>
                
                <tbody>
                    {
                        paginatedStudents.map((s) => (
                            <>
                            <tr key={s.id}>
                                <td>{s.rollno}</td>
                                <td>{s.name}</td>
                                <td>{s.email}</td>
                                <td>{s.address}</td>
                                <td>
                                    
                                    <button className="btn btn-warning btn-sm me-2"
                                    onClick={() => editStudent(s)}>EDIT</button>
                               
                                    <button className="btn btn-danger btn-sm" 
                                    onClick={() => deleteStudent(s.id)}>DELETE</button>
                                </td>
                            </tr>
                            
                            </>
                        ))
                    }
                    
                </tbody>
            </table>
            <div className="d-flex align-items-center gap-3">
                    <button className="btn btn-outline-secondary btn-sm"
                    onClick={() => setCurrentPage(currentPage-1)} disabled={currentPage === 1}>
                        Prev
                    </button>
                    <span>Page {currentPage} of {totalPages}</span>
                    <button className="btn btn-outline-secondary btn-sm"
                     onClick={() => setCurrentPage(currentPage+1)} disabled={currentPage >= totalPages}>
                        Next
                    </button>
            </div>

        </div>
            
    )

}

export default Students