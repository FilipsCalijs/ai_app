import PrivateRoute from "../PrivateRoute"; // путь подкорректируй
import Signup from "./pages/Signup"; // сделай эту страницу сам

function AppContent() {
  const location = useLocation();
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    let timer;

    if (location.pathname === "/create-image") {
      timer = setTimeout(() => {
        setShowModal(true);
      }, 5000); // исправил на 5000 мс как в твоём условии
    } else {
      setShowModal(false);
    }

    return () => clearTimeout(timer);
  }, [location.pathname]);

  return (
    <>
      {showModal && <ModalWindow onClose={() => setShowModal(false)} />}
      <Routes>
        <Route
          path="/"
          element={
            <>
              <TopBanner />
              <FrontHero />
              <Review />
              <HowWork />
              <SliderCompare />
              <FAQ />
              <Footer />
            </>
          }
        />
        <Route
          path="/create-image"
          element={
            <PrivateRoute>
              <h1>Create Image Page</h1>
            </PrivateRoute>
          }
        />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </>
  );
}
