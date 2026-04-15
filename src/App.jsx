import './App.css'

import GetStudentById from './Component/Student/Pages/StudentView';
import StudentForm from "./Component/Student/Pages/StudentForm";
import StudentList from './Component/Student/Pages/StudentList';
import StudentUpdateForm from './Component/Student/Pages/StudentUpdateForm';
import { Routes,Route } from 'react-router-dom';
import BookList from './Component/Book/components/BookList';
import GetBookById from './Component/Book/components/BookView';
import BookForm from './Component/Book/components/BookForm';
import UpdateBook from './Component/Book/components/UpdateBook';
import IssueBook from './Component/Issue/components/IssueBook';
import AllRecords from './Component/Issue/components/AllRecords';
import GetRecordById from './Component/Issue/components/GetRecordById';
import GetRecordsByStudentName from './Component/Issue/components/GetRecordsByStudentName';
import Home from './Home';
import Practice from './Practice';

function App() {

  return (
    <>
        {/* <Routes> */}

  {/* Home Page */}
  {/* <Route path="/" element={<Home />} /> */}

  {/* Student Routes */}
  {/* <Route path="/students" element={<StudentList />} />
  <Route path="/students/create" element={<StudentForm />} />
  <Route path="/students/update/:id" element={<StudentUpdateForm />} />
  <Route path="/students/view/:id" element={<GetStudentById />} /> */}

  {/* Book Routes */}
  {/* <Route path="/books" element={<BookList />} />
  <Route path="/books/create" element={<BookForm />} />
  <Route path="/books/update/:id" element={<UpdateBook />} />
  <Route path="/books/view/:id" element={<GetBookById />} />  */}

  {/* Record Routes */}
  {/* <Route path="/records" element={<AllRecords />} />
  <Route path="/records/issue" element={<IssueBook />} />
  <Route path="/view/:id" element={<GetRecordById />} />

</Routes>  */}

<Practice />

      
    </>
  )
}

export default App
