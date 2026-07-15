"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function UserDetails() {
    const { id } = useParams();
    const router = useRouter();
    const [user, setUser] = useState<any>(null);
    const [updating, setUpdating] = useState(false);

    useEffect(() => {
        const fetchUser = async () => {
            const { data } = await supabase.from('users').select('*').eq('id', id).single();
            setUser(data);
        };
        fetchUser();
    }, [id]);

    const handleUpdate = async (e: React.FormEvent) => {
        e.preventDefault();
        setUpdating(true);
        await supabase.from('users').update(user).eq('id', id);
        setUpdating(false);
        router.push('/admin/users');
    };

    if (!user) return <div>Loading...</div>;

    return (
        <div className="p-8 max-w-2xl">
            <h1 className="text-2xl font-bold mb-6">Edit User: {user.username}</h1>
            <form onSubmit={handleUpdate} className="space-y-4 bg-white p-6 rounded-lg shadow-sm border">
                <div>
                    <Label>Username</Label>
                    <Input value={user.username || ''} onChange={(e) => setUser({...user, username: e.target.value})} />
                </div>
                <div>
                    <Label>Role</Label>
                    <select className="w-full border p-2 rounded" value={user.role} onChange={(e) => setUser({...user, role: e.target.value})}>
                        <option value="user">User</option>
                        <option value="admin">Admin</option>
                        <option value="super_admin">Super Admin</option>
                    </select>
                </div>
                <Button type="submit" disabled={updating}>Save Changes</Button>
            </form>
        </div>
    );
}