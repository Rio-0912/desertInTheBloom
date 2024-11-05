import React, { useEffect, useState } from "react";
import { useUser } from "@clerk/clerk-react";
import toast from "react-hot-toast";
import { Country, State, City } from 'country-state-city';
import ProfileSkeleton from "../Skeleton/ProfileSkeleton";
import { RiInformation2Line } from "react-icons/ri";
import Nav from "../Components/Nav";

const ProfilePage = () => {
    const { user, isLoaded } = useUser();
    const [loader, setLoader] = useState(true);
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [mobileNo, setMobileNo] = useState("");
    const [roomNo, setRoomNo] = useState('');
    const [area, setArea] = useState('');
    const [selectedCountry, setSelectedCountry] = useState(null);
    const [selectedState, setSelectedState] = useState(null);
    const [selectedCity, setSelectedCity] = useState(null);
    const [pincode, setPincode] = useState('');
    const [states, setStates] = useState([]);
    const [cities, setCities] = useState([]);
    const [countryQuery, setCountryQuery] = useState("");
    const [filteredCountries, setFilteredCountries] = useState([]);
    const [stateQuery, setStateQuery] = useState("");
    const [filteredStates, setFilteredStates] = useState([]);
    const [cityQuery, setCityQuery] = useState("");
    const [filteredCities, setFilteredCities] = useState([]);

    const countries = Country.getAllCountries();

    useEffect(() => {
        if (isLoaded) {
            loadUserData();
        }
        
    }, [isLoaded]);

    const loadUserData = () => {
        if (user) {
            setUsername(user.firstName || "");
            setEmail(user.emailAddresses[0].emailAddress || "");
            setMobileNo(user.phoneNumbers[0]?.phoneNumber || "");
            const address = user.publicMetadata?.address || "";
            const splitAddress = address.split(',');

            setRoomNo(splitAddress[0]?.trim() || "");
            setArea(splitAddress[1]?.trim() || "");
            setPincode(splitAddress[5]?.trim() || "");

            const cityName = splitAddress[2]?.trim();
            const stateName = splitAddress[3]?.trim();
            const foundCountry = countries.find(country =>
                State.getStatesOfCountry(country.isoCode).some(state => state.name === stateName)
            );

            if (foundCountry) {
                setSelectedCountry(foundCountry);
                setCountryQuery(foundCountry.name);
                const foundState = State.getStatesOfCountry(foundCountry.isoCode).find(state => state.name === stateName);
                setStates(State.getStatesOfCountry(foundCountry.isoCode));
                setSelectedState(foundState);
                if (foundState) {
                    const foundCity = City.getCitiesOfState(foundCountry.isoCode, foundState.isoCode).find(city => city.name === cityName);
                    setCities(City.getCitiesOfState(foundCountry.isoCode, foundState.isoCode));
                    setSelectedCity(foundCity);
                }
            }
            setLoader(false);
        }
    };

    const handleCountryChange = (query) => {
        setCountryQuery(query);
        const filtered = countries.filter(country => country.name.toLowerCase().includes(query.toLowerCase()));
        setFilteredCountries(filtered);
    };

    const handleStateChange = (query) => {
        setStateQuery(query);
        if (selectedCountry) {
            const allStates = State.getStatesOfCountry(selectedCountry.isoCode);
            const filtered = allStates.filter(state => state.name.toLowerCase().includes(query.toLowerCase()));
            setFilteredStates(filtered);
        }
    };

    const handleCityChange = (query) => {
        setCityQuery(query);
        if (selectedState) {
            const allCities = City.getCitiesOfState(selectedCountry.isoCode, selectedState.isoCode);
            const filtered = allCities.filter(city => city.name.toLowerCase().includes(query.toLowerCase()));
            setFilteredCities(filtered);
        }
    };

    const handleCountrySelection = (country) => {
        setSelectedCountry(country);
        setCountryQuery(country.name);
        setFilteredCountries([]);
        setStates(State.getStatesOfCountry(country.isoCode));
        setSelectedState(null);
        setSelectedCity(null);
        setFilteredStates([]);
        setCities([]);
        setFilteredCities([]);
    };

    const handleStateSelection = (state) => {
        setSelectedState(state);
        setStateQuery(state.name);
        setFilteredStates([]);
        setCities(City.getCitiesOfState(selectedCountry.isoCode, state.isoCode));
        setSelectedCity(null);
        setFilteredCities([]);
    };

    const handleCitySelection = (city) => {
        setSelectedCity(city);
        setCityQuery(city.name);
        setFilteredCities([]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!roomNo || !area || !selectedCity || !selectedState || !pincode) {
            toast.error("All fields of address are required.");
            return;
        }

        const address = `${roomNo}, ${area}, ${selectedCity?.name}, ${selectedState?.name}, ${selectedCountry?.name}, ${pincode}`;
        await user.update({ publicMetadata: { address } });

        toast.success("Information Updated");
    };

    return (
        <div className="p-1">
            {!isLoaded ? (
                <div>Login first</div>
            ) : loader ? (
                <ProfileSkeleton />
            ) : (
                <div className=" ">

                    <section className=" flex gap-5 max-h-[50vh] items-center bg-gradient-to-b from-[#d7e394] to-[#ffffff] p-4 rounded-md">
                        <p className="rounded-full p-2 bg-gray-50 shadow">
                            <RiInformation2Line size={50} color="#d1bf6a" />
                        </p>
                        <section>
                            <p className="text-md md:text-3xl font-bold">Personal Information</p>
                            <span className="text-sm font-medium text-gray-700">
                                Please update your personal information.
                            </span>
                        </section>
                    </section>
                    <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-4">
                        <div className="flex flex-col md:flex-row gap-4">
                            <div className="w-full">
                                <label className="block text-sm font-medium text-gray-700">Name</label>
                                <input
                                    type="text"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    disabled
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                                />
                            </div>
                            <div className="w-full">
                                <label className="block text-sm font-medium text-gray-700">Email</label>
                                <input
                                    type="email"
                                    value={email}
                                    disabled
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                                />
                            </div>
                        </div>
                        <div className="w-full">
                            <label className="block text-sm font-medium text-gray-700">Mobile No</label>
                            <input
                                type="text"
                                value={mobileNo}
                                disabled
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                            />
                        </div>
                        <div className="flex flex-col md:flex-row gap-4">
                            <div className="w-full">
                                <label className="block text-sm font-medium text-gray-700">Room No</label>
                                <input
                                    type="text"
                                    value={roomNo}
                                    onChange={(e) => setRoomNo(e.target.value)}
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                                />
                            </div>
                            <div className="w-full">
                                <label className="block text-sm font-medium text-gray-700">Area</label>
                                <input
                                    type="text"
                                    value={area}
                                    onChange={(e) => setArea(e.target.value)}
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                                />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Country</label>
                            <input
                                type="text"
                                value={countryQuery}
                                onChange={(e) => handleCountryChange(e.target.value)}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                            />
                            {filteredCountries.length > 0 && (
                                <ul className="absolute z-10 max-h-60 overflow-auto w-full bg-white shadow-lg border">
                                    {filteredCountries.map((country) => (
                                        <li
                                        
                                            key={country.id}
                                            onClick={() => handleCountrySelection(country)}
                                            className="cursor-pointer px-3 py-2 hover:bg-gray-100"
                                        >
                                            {country.name}
                                        </li>
                                    ))}
                                  
                                </ul>
                            )}
                        </div>
                        {selectedCountry && (
                            <div>
                                <label className="block text-sm font-medium text-gray-700">State</label>
                                <input
                                    type="text"
                                    value={stateQuery}
                                    onChange={(e) => handleStateChange(e.target.value)}
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                                />
                                {filteredStates.length > 0 && (
                                    <ul className="absolute z-10 max-h-60 overflow-auto w-full bg-white shadow-lg border">
                                        {filteredStates.map((state) => (
                                            <li
                                                key={state.id}
                                                onClick={() => handleStateSelection(state)}
                                                className="cursor-pointer px-3 py-2 hover:bg-gray-100"
                                            >
                                                {state.name}
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                        )}
                        {selectedState && (
                            <div>
                                <label className="block text-sm font-medium text-gray-700">City</label>
                                <input
                                    type="text"
                                    value={cityQuery}
                                    onChange={(e) => handleCityChange(e.target.value)}
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                                />
                                {filteredCities.length > 0 && (
                                    <ul className="absolute z-10 max-h-60 overflow-auto w-full bg-white shadow-lg border">
                                        {filteredCities.map((city) => (
                                            <li
                                                key={city.id}
                                                onClick={() => handleCitySelection(city)}
                                                className="cursor-pointer px-3 py-2 hover:bg-gray-100"
                                            >
                                                {city.name}
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                        )}
                        <div className="w-full">
                            <label className="block text-sm font-medium text-gray-700">Pincode</label>
                            <input
                                type="text"
                                value={pincode}
                                onChange={(e) => setPincode(e.target.value)}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                            />
                        </div>
                        <div>
                            <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-md">
                                Update Information
                            </button>
                        </div>
                    </form>
                </div>
            )}
        </div>
    );
};

export default ProfilePage;
