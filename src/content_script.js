import 'babel-polyfill'
import { RemoteFunctionRegistry, remoteFunction } from './util/webextensionRPC'
import 'src/activity-logger/content_script'
import 'src/page-analysis/content_script'
import 'src/search-injection/content_script'
import AnnotationsManager from 'src/sidebar-overlay/annotations-manager'
import initContentTooltip from 'src/content-tooltip/content_script'
import 'src/direct-linking/content_script'
import initRibbonAndSidebar from './sidebar-overlay/content_script'
import 'src/backup/content_script'
import ToolbarNotifications from 'src/toolbar-notification/content_script'
import isPDFJSViewer from 'src/util/pdf-viewer'

const remoteFunctionRegistry = new RemoteFunctionRegistry()

const toolbarNotifications = new ToolbarNotifications()
toolbarNotifications.registerRemoteFunctions(remoteFunctionRegistry)
// toolbarNotifications.showToolbarNotification('tooltip-first-close')
window['toolbarNotifications'] = toolbarNotifications

const annotationsManager = new AnnotationsManager()

initContentTooltip({ toolbarNotifications })
initRibbonAndSidebar({ annotationsManager, toolbarNotifications })

if (isPDFJSViewer()) {
    remoteFunction('toggleSidebarOverlay')()
}
