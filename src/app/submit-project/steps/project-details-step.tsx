"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Plus, X } from "lucide-react"
import type { ProjectFormData } from "../types"

interface ProjectDetailsStepProps {
  formData: ProjectFormData
  updateFormData: (data: Partial<ProjectFormData>) => void
}

export default function ProjectDetailsStep({ formData, updateFormData }: ProjectDetailsStepProps) {
  const addFeature = () => {
    updateFormData({ features: [...formData.features, ""] })
  }

  const removeFeature = (index: number) => {
    const newFeatures = formData.features.filter((_, i) => i !== index)
    updateFormData({ features: newFeatures })
  }

  const updateFeature = (index: number, value: string) => {
    const newFeatures = [...formData.features]
    newFeatures[index] = value
    updateFormData({ features: newFeatures })
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold mb-4">Project Details</h2>
        <p className="text-gray-600 mb-6">Provide detailed information about your project.</p>
      </div>

      <div className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="description">Project Description *</Label>
          <Textarea
            id="description"
            placeholder="Describe your project in detail. What does it do? What problem does it solve?"
            value={formData.description}
            onChange={(e) => updateFormData({ description: e.target.value })}
            className="min-h-[120px] resize-none"
          />
          <p className="text-sm text-gray-500">Minimum 100 characters recommended</p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="objectives">Project Objectives *</Label>
          <Textarea
            id="objectives"
            placeholder="What were the main objectives and goals of this project?"
            value={formData.objectives}
            onChange={(e) => updateFormData({ objectives: e.target.value })}
            className="min-h-[100px] resize-none"
          />
        </div>

        <div className="space-y-2">
          <Label>Key Features *</Label>
          <div className="space-y-3">
            {formData.features.map((feature, index) => (
              <div key={index} className="flex gap-2">
                <Input
                  placeholder={`Feature ${index + 1}`}
                  value={feature}
                  onChange={(e) => updateFeature(index, e.target.value)}
                  className="h-12"
                />
                {formData.features.length > 1 && (
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => removeFeature(index)}
                    className="h-12 w-12 p-0"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                )}
              </div>
            ))}
            <Button
              type="button"
              variant="outline"
              onClick={addFeature}
              className="flex items-center gap-2 bg-transparent"
            >
              <Plus className="h-4 w-4" />
              Add Feature
            </Button>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="challenges">Challenges Faced</Label>
          <Textarea
            id="challenges"
            placeholder="What challenges did you encounter during development? How did you overcome them?"
            value={formData.challenges}
            onChange={(e) => updateFormData({ challenges: e.target.value })}
            className="min-h-[100px] resize-none"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="outcomes">Outcomes & Results</Label>
          <Textarea
            id="outcomes"
            placeholder="What were the final outcomes? Any metrics, achievements, or results to share?"
            value={formData.outcomes}
            onChange={(e) => updateFormData({ outcomes: e.target.value })}
            className="min-h-[100px] resize-none"
          />
        </div>
      </div>
    </div>
  )
}
