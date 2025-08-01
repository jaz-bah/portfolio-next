import { connectToDatabase } from "@/lib/db";
import Project from "@/models/project.model";
import { IProject } from "@/types/project.type";
import { NextRequest, NextResponse } from "next/server";


export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;

    try {
        await connectToDatabase();
        const projects = await Project.findById(id);
        return NextResponse.json({ projects }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: (error as Error).message }, { status: 500 });
    }
}


export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;

    try {
        await connectToDatabase();
        const projects = await Project.findByIdAndDelete(id);
        return NextResponse.json({ projects }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: (error as Error).message }, { status: 500 });
    }
}


export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const data: IProject = await request.json();

    try {
        await connectToDatabase();
        const projects = await Project.findByIdAndUpdate(id, data, { new: true });
        return NextResponse.json({ projects }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: (error as Error).message }, { status: 500 });
    }
}

