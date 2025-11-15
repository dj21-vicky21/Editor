import React from 'react'
import { Button } from '@/components/ui/button'

function Text() {
  return (
    <div className="p-4 space-y-4">
        <div className="space-y-2">
          <Button
            variant="outline"
            className="w-full justify-start text-gray-300 border-gray-600 hover:bg-gray-700"
          >
            Add Heading
          </Button>
          <Button
            variant="outline"
            className="w-full justify-start text-gray-300 border-gray-600 hover:bg-gray-700"
          >
            Add Body Text
          </Button>
          <Button
            variant="outline"
            className="w-full justify-start text-gray-300 border-gray-600 hover:bg-gray-700"
          >
            Font Combinations
          </Button>
        </div>
        <div className="mt-6">
          <h4 className="text-sm font-medium text-gray-300 mb-2">
            Font Styles
          </h4>
          <div className="space-y-2">
            <div className="p-2 bg-gray-700 rounded text-white text-sm">
              Roboto - Regular
            </div>
            <div className="p-2 bg-gray-700 rounded text-white text-sm font-bold">
              Roboto - Bold
            </div>
            <div className="p-2 bg-gray-700 rounded text-white text-sm italic">
              Roboto - Italic
            </div>
          </div>
        </div>
      </div>
  )
}

export default Text