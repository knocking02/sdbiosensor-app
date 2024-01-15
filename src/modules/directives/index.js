import numberOnly from '@/modules/directives/numberOnly'
import numberEngOnly from '@/modules/directives/numberEngOnly'
import fixLayout from '@/modules/directives/fixLayout'

export default function (app) {
   app.directive('numberOnly', numberOnly)
   app.directive('numberEngOnly', numberEngOnly)
   app.directive('fixLayout', fixLayout)
}
