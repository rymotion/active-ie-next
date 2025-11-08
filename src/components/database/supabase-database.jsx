"use client";

import { createClient } from "@/lib/supabase/client";
import { useEffect, useState } from "react";

/**
 * Example component demonstrating Supabase database integration
 * This component fetches data from a Supabase table
 */
export default function SupabaseDatabase() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const supabase = createClient();

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        // Example: Fetch from a table named 'items'
        // Replace 'items' with your actual table name
        const { data: items, error: fetchError } = await supabase
          .from('items')
          .select('*')
          .limit(10);

        if (fetchError) throw fetchError;
        setData(items || []);
      } catch (err) {
        setError(err.message);
        console.error('Error fetching data:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h2>Supabase Data</h2>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}
