"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, Eye, User } from "lucide-react";

export default function AdminUsers() {
    const [users, setUsers] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        setLoading(true);
        // Changed from 'profiles' to 'users'
        const { data, error } = await supabase
            .from('users')
            .select('*')
            .order('created_at', { ascending: false });

        if (!error) setUsers(data || []);
        setLoading(false);
    };

    return (
        <div className="p-8">
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-[#0B1E4A]">Registered Users</h1>
                <p className="text-gray-500 text-sm">Manage user accounts from the database.</p>
            </div>

            <Card className="border-0 shadow-sm ring-1 ring-gray-200">
                <CardHeader className="border-b bg-gray-50/50">
                    <CardTitle className="text-lg">User Directory</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                    <Table>
                        <TableHeader>
                            <TableRow className="hover:bg-transparent">
                                <TableHead className="pl-6">Full Name</TableHead>
                                <TableHead>Email</TableHead>
                                <TableHead>Joined</TableHead>
                                <TableHead className="text-right pr-6">Action</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {loading ? (
                                <TableRow><TableCell colSpan={4} className="text-center py-12"><Loader2 className="animate-spin h-5 w-5 mx-auto text-[#FF7A00]" /></TableCell></TableRow>
                            ) : users.length === 0 ? (
                                <TableRow><TableCell colSpan={4} className="text-center py-12 text-gray-500">No users found.</TableCell></TableRow>
                            ) : (
                                users.map((user) => (
                                    <TableRow key={user.id} className="group">
                                        <TableCell className="pl-6 font-medium flex items-center gap-3">
                                            <div className="h-8 w-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500">
                                                <User className="h-4 w-4" />
                                            </div>
                                            {user.name || user.username || "N/A"}
                                        </TableCell>
                                        <TableCell className="text-sm text-gray-600">{user.email}</TableCell>
                                        <TableCell className="text-sm text-gray-500">
                                            {user.created_at ? new Date(user.created_at).toLocaleDateString() : "N/A"}
                                        </TableCell>
                                        <TableCell className="text-right pr-6">
                                            <Button variant="ghost" size="icon" className="hover:bg-blue-50" onClick={() => router.push(`/admin/users/${user.id}`)}>
                                                <Eye className="h-4 w-4 text-blue-600" />
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    );
}