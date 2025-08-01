import { connectToDatabase } from "@/lib/db";
import Project from "@/models/project.model";
import { IProject } from "@/types/project.type";
import { NextResponse } from "next/server"; 


export async function GET() {
    try {
        await connectToDatabase();
        const projects = await Project.find({});
        return NextResponse.json({ projects }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: (error as Error).message }, { status: 500 });
    }
}


export async function POST(request: Request) {
    try {
        await connectToDatabase();
        const data : IProject = await request.json();
        const project = new Project(data);
        await project.save();
        return NextResponse.json({ project }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: (error as Error).message }, { status: 500 });
    }
}

