"use client";

import { createClient } from '@/lib/supabase/client';
import { useEffect, useState } from 'react';
import type { SupabaseClient } from '@supabase/supabase-js';

/**
 * Hook to get the Supabase client instance
 * @returns Supabase client
 */
export function useSupabase(): SupabaseClient {
  return createClient();
}

/**
 * Hook to fetch data from a Supabase table
 * @param tableName - Name of the table to query
 * @param options - Query options (select, filter, order, limit)
 * @returns Object containing data, loading state, error, and refetch function
 */
export function useSupabaseQuery<T = unknown>(
  tableName: string,
  options?: {
    select?: string;
    filter?: Record<string, unknown>;
    order?: { column: string; ascending?: boolean };
    limit?: number;
  }
) {
  const [data, setData] = useState<T[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const supabase = useSupabase();

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);

      let query = supabase.from(tableName).select(options?.select || '*');

      // Apply filters
      if (options?.filter) {
        Object.entries(options.filter).forEach(([key, value]) => {
          query = query.eq(key, value);
        });
      }

      // Apply ordering
      if (options?.order) {
        query = query.order(options.order.column, {
          ascending: options.order.ascending ?? true,
        });
      }

      // Apply limit
      if (options?.limit) {
        query = query.limit(options.limit);
      }

      const { data: result, error: fetchError } = await query;

      if (fetchError) throw fetchError;
      setData(result as T[]);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Unknown error'));
      console.error('Error fetching data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [tableName, JSON.stringify(options)]);

  return { data, loading, error, refetch: fetchData };
}

/**
 * Hook to insert data into a Supabase table
 * @param tableName - Name of the table to insert into
 * @returns Object containing insert function, loading state, and error
 */
export function useSupabaseInsert<T = unknown>(tableName: string) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const supabase = useSupabase();

  const insert = async (data: Partial<T> | Partial<T>[]) => {
    try {
      setLoading(true);
      setError(null);

      const { data: result, error: insertError } = await supabase
        .from(tableName)
        .insert(data)
        .select();

      if (insertError) throw insertError;
      return result;
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Unknown error');
      setError(error);
      console.error('Error inserting data:', err);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return { insert, loading, error };
}

/**
 * Hook to update data in a Supabase table
 * @param tableName - Name of the table to update
 * @returns Object containing update function, loading state, and error
 */
export function useSupabaseUpdate<T = unknown>(tableName: string) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const supabase = useSupabase();

  const update = async (
    filter: Record<string, unknown>,
    data: Partial<T>
  ) => {
    try {
      setLoading(true);
      setError(null);

      let query = supabase.from(tableName).update(data);

      // Apply filters
      Object.entries(filter).forEach(([key, value]) => {
        query = query.eq(key, value);
      });

      const { data: result, error: updateError } = await query.select();

      if (updateError) throw updateError;
      return result;
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Unknown error');
      setError(error);
      console.error('Error updating data:', err);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return { update, loading, error };
}

/**
 * Hook to delete data from a Supabase table
 * @param tableName - Name of the table to delete from
 * @returns Object containing delete function, loading state, and error
 */
export function useSupabaseDelete(tableName: string) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const supabase = useSupabase();

  const deleteData = async (filter: Record<string, unknown>) => {
    try {
      setLoading(true);
      setError(null);

      let query = supabase.from(tableName).delete();

      // Apply filters
      Object.entries(filter).forEach(([key, value]) => {
        query = query.eq(key, value);
      });

      const { error: deleteError } = await query;

      if (deleteError) throw deleteError;
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Unknown error');
      setError(error);
      console.error('Error deleting data:', err);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return { delete: deleteData, loading, error };
}
