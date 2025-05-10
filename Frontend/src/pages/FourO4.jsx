import { useNavigate, useParams } from 'react-router-dom';
import '../App.css'

const FourO4 = () => {
  const navigate = useNavigate();
  const {x} = useParams()

  return (
    <div className="four-o-four-container">
      <div className="message text-center">
        <br />
        <br />
        <br />
        <h1>404</h1>
        <h2>Oww sir, we have a problem! with <span className='code'>/{x}</span></h2>
        <p>The page you're looking for lost in space.</p>
        <button onClick={() => navigate('/')} className="shadow p-2 mb-5 bg-body rounded home-button fs-4 text bg-warning text-dark border border-light">
          Beam Me Home
        </button>
        <br />
        <br />
        <br />
      </div>
    </div>
  );
};

export default FourO4;