import { AddProjectForm } from '@/components/form/AddProjectForm'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'

export default function NewProject() {
  return (
    <div className='max-w-4xl mx-auto py-5'>
        <Card>
            <CardHeader className='flex items-center gap-2'>
                <Link href="/admin/projects">
                  <ArrowLeft/>
                </Link>
                <CardTitle className='text-2xl capitalize'>Add new project</CardTitle>
            </CardHeader>

            <CardContent>
                <AddProjectForm />
            </CardContent>
        </Card>
    </div>
  )
}
