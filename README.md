# node_db

## express

### req

req.params
包含命名的路由参数的一个数组。

req.query
包含查询串参数(有时称为 GET 参数)作为名 / 值对的一个对象

req.body
包含 POST 参数的一个对象。把这个参数对象叫作 body，是因为 POST 参数是放入 body 里传过来的，而不是像查询串参数那样包含在 URL 里。要想使用 req.body，需要有能 解析 body 内容类型的中间件

req.route
有关当前所匹配路由的信息。主要用于路由调试

req.cookies/req.signedCookies
包含客户端传过来的 Cookie 值的对象

req.headers
从客户端接收到的请求头信息。这是一个对象，它的键是请求头的名称，值是请求头 的值。注意它来自底层的 http.IncomingMessage 对象，因此没有在 Express 文档中列 出来

req.accepts(types)
一个用于确定客户端是否接受某个(或某几个)媒体类型(可选的 types 参数可以是单 个 MIME 类型，比如 application/json，也可以是一个逗号分隔的列表，或一个数组) 的简便方法。对这个方法最感兴趣的是那些写公开 API 的人。一般认为，如果没有指 定，浏览器总是会默认接受 HTML

req.ip
客户端的 IP 地址。 req.path
请求的路径(不包含协议、主机、端口或查询串)

req.hostname
一个用以返回客户端报告的(服务器)主机名的简便方法。这个信息可能会伪造，不应该用于涉及安全的用途

req.xhr
一个简便属性，如果请求是由 Ajax 调用发起的，就返回 true

req.protocol
建立当前请求所使用的协议(对本书来说，不是 http 就是 https)

req.secure
一个简便属性，如果连接是安全的就返回 true。这等价于 req.protocol === 'https'

req.url/req.originalUrl
名称有点儿误导性，它们返回路径和查询串(不包含协议、主机或端口)。出于内部路 由的目的，req.url 可以被重写，而 req.originalUrl 的设计本意就是为了保存最初的请求和查询串

### res

res.status(code)
设置 HTTP 状态码。Express 默认设置为 200(OK)，当你想要返回 404(页面未找到)、 500(服务器错误)或其他状态码时，就必须使用这个方法。对于重定向来说(状态 码 301、302、303 和 307)，使用 redirect 方法更合适。请注意，res.status 返回的是 response 对象本身，意味着你可以链式调用:res.status(404).send('Not found')

res.set(name, value)
设置响应头信息。正常情况是不需要手动设置的。也可以一次设置多个响应头，只需要
传入一个参数对象，对象的键是响应头的名称，值是响应头的值

res.cookie(name, value, [options]), res.clearCookie(name, [options])
设置或清除在客户端存储的 Cookie。这要求某些中间件的支持

res.redirect([status], url )
让浏览器重定向。重定向状态码默认是 302(资源已找到)。一般来说应该尽量少用重定向，除非永久性地移动了某个页面，要是那样的话，应该用状态码 301(永久性移动)

res.send(body)
向客户端发送一个响应。Express 默认使用内容类型 text/html，因此如果想改为 text/plain，就必须在调用 res.send 之前调用 res.type('text/plain')。如果 body 是一个对象或数组，响应就以 JSON 的格式发送(会适当地设置内容类型)。不过如果要发送 JSON，我会推荐调用 res.json，这样更明确一些

res.json(json)
发送 JSON 到客户端

res.jsonp(json)
发送 JSONP 到客户端

res.end()
不发送响应，结束当前连接

res.type(type)
设置 Content-Type 头信息的简便方法。基本上等价于 res.set(\'Content-Type ', type)， 它也会尝试把文件扩展名映射到互联网媒体类型。要是提供了一个不包含斜杠的字符串的话，比如 res.type('txt ')，结果就相当于设置内容类型 text/plain。这个功能(映 射文件扩展名)在有些地方是有用的(例如，支持各种类型多媒体文件的自动文件服务)，但一般来说，应该避免用它并选择明确地设置正确的互联网媒体类型

res.format(object)
这个方法允许你根据 Accept 请求头来发送不同的内容，它主要用于 API 中，第 15 章将进一步讨论。下面是一个简单的例子:res.format({'text/plain': 'hi there', 'text/ html': '<b>hi there</b>'})

res.attachment([filename]), res.download(path, [filename], [callback])
这两个方法都会把一个名为 Content-Disposition 的响应头设置为 attachment，这会告诉浏览器响应的内容是要下载的，而不是在浏览器上显示。可以指定 filename，用于提示浏览器保存文件时的文件名。使用 res.download 可以指定要下载的文件，而 res.attachment 仅是设置这个响应头，你还需要给客户端发送内容

res.sendFile(path, [options], [callback])
这个方法会读取由 path 指定的文件，并把文件内容发送到客户端。这个方法应该不太 常用，因为使用 static 中间件会更容易，只要把想让客户端访问的文件放进 public 目录就可以了。然而，如果想根据某些条件给同一个 URL 提供不同的资源，这个方法就比较方便了

res.links(links)
设置 Links 响应头。这是个专门的响应头，不太常用

res.locals,res.render(view, [locals], callback)
res.locals 是一个对象，包含渲染视图的默认上下文。res.render 会使用预配置的模板引擎渲染一个视图(传入 res.render 的 locals 参数不要跟 res.locals 相混淆:locals 参数会覆盖 res.locals 中的上下文，但没被覆盖的部分仍然可用)。注意 res.render 会默认使用状态码 200，指定另外的状态码就要使用 res.status

### 模块

lib/application.js
这是 Express 的主要接口。如果想理解中间件是怎么链接起来的或视图是怎么渲染的， 就需要读这个文件

lib/express.js
一个相对短小的文件，主要提供了 createApplication 函数(这个文件的默认导出)，这 个函数用于创建 Express 应用的一个实例

lib/request.js
扩展 Node 的 http.IncomingMessage 对象，从而提供一个健壮的 request 对象。这个文件 包含 request 对象所有的属性和方法

lib/response.js
扩展 Node 的 http.ServerResponse 对象，从而提供 response 对象。这个文件包含 response 对象的属性和方法

lib/router/route.js
提供基本的路由支持。尽管路由在应用中处于中心地位，但这个文件才不到 230 行，既 简单又优雅
