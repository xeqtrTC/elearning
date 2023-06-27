import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import { RequireForLogin, RequireForMyCoursePage } from './hooks/RequireAuthPage'
import './index.css'
import { About, 
  AboutInstructor, 
  AddCategory, 
  AddCourse,
  AddInstructor,
  AddRole, 
  CourseDetails, 
  CourseDetailsAdmin, 
  CoursesList, 
  DashBoard, 
  DoesntExistPage, 
  GuestChat, 
  Homescreen, 
  ListAdminCourses, 
  ListOfUsers, 
  Login, 
  MainPage, 
  MyCourses, 
  RootLayout, 
  SendEmailSubs, 
  Register, 
  Unsubscribe, 
  VerifyAccountToken, 
  WatchLectures,
  AddBadges,
  ListBadges,
  AddRequirmentTypeBadgeLazy,
  AddBridgeCriteriaLazy,
  CreateQuizzLazy,
  QuizzListLazy,
} from './LazyFiles'
import { Suspense } from 'react'
import Loading from './components/Loading/Loading'
import LoaderSpinner from './UI/LoaderSpinner'
import WatchLecturesVideo from './components/WatchLectures/WatchLecturesVideo'
import EditQuizz from './components/AdminStuff/QuizzList/EditQuizz'
// import NewLogin from './components/Login/NewLogin'
function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route >
        <Route path='/' element={
          <Suspense 
          fallback={<Loading />}>
            <RootLayout />
          </Suspense>
          }
          >
          <Route index element={
            <Suspense fallback={<Loading />}>
              <Homescreen />
            </Suspense>
          } 
          />
          <Route path='about'>
            <Route index element={
              <Suspense fallback={<Loading />}>
                <About />
              </Suspense>
            } 
            />
            <Route path='instructor/:usernameOfInstructor' element={
              <Suspense fallback={<Loading />}>
                <AboutInstructor />
              </Suspense>
            } 
            />
          </Route>
          <Route element={
            <Suspense fallback={<Loading />}>
              <RequireForMyCoursePage />
            </Suspense>
          }>
          <Route path='mycourses' element={
            <Suspense fallback={<Loading />}>
              <MyCourses />
            </Suspense>
          } 
          />
          </Route>
          <Route path='courses/'>
            <Route index element={
              <Suspense fallback={<Loading />}>
                <CoursesList />
              </Suspense>
            } 
            />
            <Route path=':name/' element={
              <Suspense fallback={<Loading />}>
                <CourseDetails />
              </Suspense>
            } 
            />
          </Route>
          <Route path='/verify-account/:token' element={
            <Suspense fallback={<Loading />}>
              <VerifyAccountToken />
            </Suspense>
          } 
          />

        </Route>
        <Route path='/unsubscribe/:uniqueID' element={
          <Suspense fallback={<Loading />}>
            <Unsubscribe />
          </Suspense>
        } 
        />
        <Route element={
          <Suspense fallback={<Loading />}>
            <RequireForLogin />
          </Suspense>
        }>
          <Route path='/signup' element={
            <Suspense fallback={<Loading />}>
              <Register />
            </Suspense>
          } />
          <Route path='/login' element={
            <Suspense fallback={<Loading />}>
              <Login />
            </Suspense>
          } />
        </Route>
        <Route path='/courses/:name/lectures' element={
          <Suspense fallback={<Loading />}>
            <WatchLectures />
          </Suspense>
        }>
          <Route path=':id' element={
            <Suspense fallback={<Loading />}>
              <WatchLecturesVideo   />
            </Suspense>
          } />
        </Route>
          <Route path='homepage' element={
                <MainPage />
              // </Suspense>
          }>
              <Route index element={
                <Suspense fallback={<LoaderSpinner />}>
                  <DashBoard />
                </Suspense>
              } />
              <Route path='addcourse' element={
                <Suspense fallback={<LoaderSpinner />}>
                  <AddCourse />
                </Suspense>
              } />
              <Route path='courses' element={
                <Suspense fallback={<LoaderSpinner />}>
                  <ListAdminCourses />
                </Suspense>
              } />
              <Route path='sendemail' element={
                <Suspense fallback={<LoaderSpinner />}>
                  <SendEmailSubs />
                </Suspense>
              } />
              <Route path='addcategory' element={
                <Suspense fallback={<LoaderSpinner />}>
                  <AddCategory />
                </Suspense>
               } />
              <Route path='addinstructor' element={
                <Suspense fallback={<LoaderSpinner />}>
                  <AddInstructor />
                </Suspense>
              } />
              <Route path='guestchat' element={
                <Suspense fallback={<LoaderSpinner />}>
                  <GuestChat />
                </Suspense>
              } />
              <Route path='courses/:course_id' element={
                <Suspense fallback={<LoaderSpinner />}>
                  <CourseDetailsAdmin />
                </Suspense>
              } />
              <Route path='addrole' element={
                <Suspense fallback={<LoaderSpinner />}>
                  <AddRole />
                </Suspense>
              } />
              <Route path='userslist' element={
                <Suspense fallback={<LoaderSpinner />}>
                  <ListOfUsers />
                </Suspense>
              } />
              <Route path='addbadges' element={
                <Suspense fallback={<LoaderSpinner />}>
                  <AddBadges />
                </Suspense>
              } />
              <Route path='listbadges' element={
                <Suspense fallback={<LoaderSpinner />}>
                  <ListBadges />
                </Suspense>
              } />
              <Route path='addrequirmentbadge' element={
                <Suspense fallback={<LoaderSpinner />}>
                  <AddRequirmentTypeBadgeLazy />
                </Suspense>
              } />
              <Route path='addbadgecriteria' element={
                <Suspense fallback={<LoaderSpinner />}>
                  <AddBridgeCriteriaLazy />
                </Suspense>
              } />
              <Route path='createquizz' element={
                <Suspense fallback={<LoaderSpinner />}>
                  <CreateQuizzLazy />
                </Suspense>
              } />
              <Route path='quizzlist'>
                <Route index element={
                  <Suspense fallback={<LoaderSpinner />}>
                  <QuizzListLazy />
                </Suspense>
                } />
                <Route path=':id' element={
                  <Suspense fallback={<LoaderSpinner />}>
                      <EditQuizz />
                  </Suspense>
                }/>
              </Route>
        </Route>
        <Route path='*' element={<DoesntExistPage />} />
      </Route>
    )
  )


  return (
     <RouterProvider router={router} />
  )
}

export default App
