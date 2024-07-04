import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function useCharacters(url,query) {
    const [characters, setCharacter] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    useEffect(() => {
        const controller = new AbortController();
        const signal = controller.signal;
        setIsLoading(true);
        axios
            .get(`${url}=${query}`, {
                signal,
            })
            .then((res) => {
                setCharacter(res.data.results.slice(0, 5));
            })
            .catch((err) => {
                if (!axios.isCancel()) {
                    toast.error(err.response.data.error);
                    setCharacter([]);
                }
            })
            .finally(() => setIsLoading(false));
        return () => {
            controller.abort();
        };
    }, [query]);
    return {isLoading,characters}
}