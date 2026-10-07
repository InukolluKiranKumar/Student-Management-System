//import Students from './Students.jsx'

function Dashboard({students}){

    

    const latest = students.length > 0 ? students[students.length-1] : null;
 
    return(
        <div className="card text-center mb-4" style={{ maxWidth: "400px" }}>
            <div className="card-body">
                <h5 className="card-title text-muted">Total Students</h5>
                <p className="display-5 fw-bold mb-0">{students.length}</p>
                
            </div>
            <div className="card-body">
                <h5 className="card-title text-muted">Latest Entry</h5>
                <p className="display-5 fw mb-0">{latest ? latest.name : "-"}</p>
                
            </div>
        </div>
    );
}

export default Dashboard; 