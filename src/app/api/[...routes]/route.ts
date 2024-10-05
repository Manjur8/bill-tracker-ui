import { NextRequest, NextResponse } from "next/server";
import { makeRequest } from "@/utils/ApiCall/makeRequest";


export async function GET(request: NextRequest, { params }: { params: { routes: string[] } }) {
    const route = params.routes?.join('/') + request.nextUrl.search;
    const respData = await makeRequest('get', route );
    return NextResponse.json(respData);
}

export async function POST(request: NextRequest, { params }: { params: { routes: string[] } }) {
    const route = params.routes?.join('/') + request.nextUrl.search;
    const payload = await request.json();
    const respData = await makeRequest('post', route, payload);
    return NextResponse.json(respData);
}

export async function PUT(request: NextRequest, { params }: { params: { routes: string[] } }) {
    const route = params.routes?.join('/') + request.nextUrl.search;
    const payload = await request.json();
    const respData = await makeRequest('put', route, payload);
    return NextResponse.json(respData);
}

export async function PATCH(request: NextRequest, { params }: { params: { routes: string[] } }) {
    const route = params.routes?.join('/') + request.nextUrl.search;
    const payload = await request.json();
    const respData = await makeRequest('patch', route, payload);
    return NextResponse.json(respData);
}
export async function DELETE(request: NextRequest, { params }: { params: { routes: string[] } }) {
    const route = params.routes?.join('/') + request.nextUrl.search;
    const payload = await request.json();
    const respData = await makeRequest('delete', route, payload);
    return NextResponse.json(respData);
}
