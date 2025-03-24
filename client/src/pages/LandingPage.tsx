import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <div className=" mb-10 max-w-[480px] lg:max-w-full">
      <p className="text-8xl font-semibold mb-4">X-ray</p>
      <p className="mb-3">
        Lorem ipsum dolor sit amet consectetur adipiscing, elit ac aptent eget
        nulla volutpat nec, laoreet vehicula sem eros velit. Cubilia facilisis
        fermentum lacinia suspendisse habitant vestibulum pellentesque, auctor
        iaculis cum eros est magnis aenean, penatibus nostra ac lectus integer
        ad. Lobortis mollis convallis tristique imperdiet curabitur potenti
        purus interdum feugiat montes mi egestas, gravida maecenas platea hac
        dui massa tortor mauris ad ac et.
      </p>
      <Link className="w-full flex justify-center text-blue-300 border border-blue-300 rounded-md py-2 " to={'signin'}>
      Sign In
      </Link>
    </div>
  );
}
export default LandingPage