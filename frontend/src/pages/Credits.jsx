import { useEffect, useState } from "react"
//import { dummyPlans } from "../assets/dummyData";
import Loading from "./Loading";
import { useAppContext } from "../context/AppContext";
import toast from "react-hot-toast";

const Credits = () => {

  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);

  const {axios, token} = useAppContext();

  const fetchPlans = async () => {
   /* setPlans(dummyPlans);
    setLoading(false)*/

    try {
      const {data} = await axios.get('/api/credit/plan', {
        headers: { Authorization: `Bearer ${token}` }
      });
      if(data.success){
        setPlans(data.plans);
      }
      else {
        toast.error(data.message || 'Failed to fetch plans.');
      }
    } catch (error) {
      toast.error(error.message);
    }
    setLoading(false);
  }

  const purchasePlan = async (planId) => {
    try {
      const {data} = await axios.post('/api/credit/purchase', {planId}, {headers: { Authorization: `Bearer ${token}` }});
      if(data.success){
        window.location.href = data.url
      }
      else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  }

  useEffect(() => {
    fetchPlans()
  },[]);

  if(loading) return <Loading />

  return (
    <div className="max-w-7xl h-screen overflow-y-scroll mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h2 className="text-3xl font-semibold text-center mb-10 xl:mt-30 text-gray-800 dark:text-purple-400">Credit Plans</h2>

      <div className="flex flex-wrap justify-center gap-8">
        {
          plans.map((plan) => (
            <div className={`border border-yellow-400 rounded-lg shadow hover:shadow-lg transition-shadow p-6 min-w-75 flex flex-col 
              ${plan._id==='pro' ? "bg-purple-200 dark:bg-gray-800" : "bg-blue-100 dark:bg-transparent" }`}>
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">{plan.name}</h3>
                <p className="text-2xl font-bold text-purple-600 dark:text-purple-400 mb-4">${plan.price}
                  <span className="text-sm font-semibold   text-gray-600 dark:text-purple-300">{' '}/ {plan.credits} credits</span>
                </p>

                <ul className="list-disc text-xs font-semibold list-inside text-gray-700 dark:text-purple-300 space-y-1">
                  {
                    plan.features.map((feature, index) => (
                      <li key={index}>{feature}</li>
                    ))
                  }
                </ul>
              </div>

              <button onClick={() => toast.promise(purchasePlan(plan._id), {loading: "Processing..."})}
                className=" font-semibold mt-6 rounded-md bg-purple-700 hover:bg-purple-800 active:bg-purple-900 text-white py-2 cursor-pointer transition-colors ">
                  Buy Now
              </button>

            </div>
          ))
        }
      </div>


    </div>
  )
}

export default Credits